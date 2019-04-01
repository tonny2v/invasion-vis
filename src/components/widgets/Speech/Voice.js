/**
 * @file 语音对象
 * @author treelite(c.xinle@gmail.com)
 */


import extend from './util/extend';
import recognize from './util/recognize';
import { convertSampleRate, write16PCM, writeASCII } from './util/transfer';

/**
 * 合并 Float32Array
 *
 * @param {Array.<Float32Array>} list 待合并元素
 * @return {Float32Array}
 */
function mergeBuffers(list) {
  let item;
  let len = 0;
  for (item of list) {
    len += item.length;
  }
  const res = new Float32Array(len);
  let offset = 0;
  for (item of list) {
    res.set(item, offset);
    offset += item.length;
  }

  return res;
}

/**
 * 语音对象
 *
 * @class
 */
class Voice {
  /**
     * 构造函数
     *
     * @param {Object} options 构造参数
     * @param {number} options.sampleRate 音频采样率
     * @param {string} options.token 语音识别 token
     * @param {string=} options.url 语音识别 URL
     * @param {number=} options.outputSampleRate 语音识别采样率
     * @param {string=} options.lang 语言类别
     */
  constructor(options) {
    this.config = extend({}, options);

    this.isOver = false;
    this.data = new Set();
    this.recognizing;
  }

  /**
     * 添加语音数据
     *
     * @public
     * @param {Object} buffer 语音数据
     */
  push(buffer) {
    this.data.add(buffer);
  }

  /**
     * 语音识别
     *
     * @public
     * @return {Prmise}
     */
  result() {
    if (!this.data.size) {
      return Promise.reject('no data');
    }

    if (!this.recognizing) {
      this.recognizing = recognize(
        mergeBuffers(this.data),
        this.config
      );
    }

    return this.recognizing;
  }

  /**
     * 结束语音采集
     *
     * @public
     * @return {Object}
     */
  end() {
    this.isOver = true;
    return this;
  }

  /**
     * 导出 WAV 格式
     *
     * @public
     * @param {number=} sampleRate 输出的采样率，默认为 8000
     * @return {ArrayBuffer}
     */
  wav(sampleRate = 8000) {
    const data = convertSampleRate(
      mergeBuffers(this.data),
      this.sampleRate,
      sampleRate
    );
    const buffer = new ArrayBuffer(44 + data.length * 2);
    const view = new DataView(buffer);

    /* RIFF identifier */
    writeASCII(view, 0, 'RIFF');
    /* file length */
    view.setUint32(4, 32 + data.length * 2, true);
    /* RIFF type */
    writeASCII(view, 8, 'WAVE');
    /* format chunk identifier */
    writeASCII(view, 12, 'fmt ');
    /* format chunk length */
    view.setUint32(16, 16, true);
    /* sample format (raw) */
    view.setUint16(20, 1, true);
    /* channel count */
    view.setUint16(22, 1, true);
    /* sample rate */
    view.setUint32(24, sampleRate, true);
    /* byte rate (sample rate * block align) */
    view.setUint32(28, sampleRate, true);
    /* block align (channel count * bytes per sample) */
    view.setUint16(32, 2, true);
    /* bits per sample */
    view.setUint16(34, 16, true);
    /* data chunk identifier */
    writeASCII(view, 36, 'data');
    /* data chunk length */
    view.setUint32(40, data.length * 2, true);
    /* data */
    write16PCM(view, 44, data);

    return buffer;
  }
}

export default Voice;
