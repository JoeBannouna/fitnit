import StorageWrapper from './StorageWrapper';

class Composer {
  static async compress(string: string, encoding: 'gzip' = 'gzip') {
    const byteArray = new TextEncoder().encode(string);
    const cs = new CompressionStream(encoding);
    const writer = cs.writable.getWriter();
    writer.write(byteArray);
    writer.close();
    let result = await new Response(cs.readable).arrayBuffer();
    return result;
  }

  static async decompress(byteArray: ArrayBuffer, encoding: 'gzip' = 'gzip') {
    const cs = new DecompressionStream(encoding);
    const writer = cs.writable.getWriter();
    writer.write(byteArray);
    writer.close();
    let result;
    try {
      result = new TextDecoder().decode(await new Response(cs.readable).arrayBuffer());
    } catch (error) {
      result = '';
    }

    return result;
  }

  private static arrayBufferToBase64(buffer: ArrayBuffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  private static base64ToArrayBuffer(base64: string) {
    var binaryString = window.atob(base64);
    var bytes = new Uint8Array(binaryString.length);
    for (var i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }

  private static isJsonString(str: string) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  static async exportWorkout(workoutId: number) {
    return this.arrayBufferToBase64(await this.compress(StorageWrapper.fetchWorkoutString(workoutId)));
  }

  static async getWorkoutJSON(base64: string) {
    const workoutJSON = await Composer.decompress(Composer.base64ToArrayBuffer(base64));
    if (!this.isJsonString(workoutJSON)) return false;
    return workoutJSON;
  }

  static async importWorkout(base64: string) {
    const workoutJSON = await this.getWorkoutJSON(base64);
    if (!workoutJSON) return false;

    StorageWrapper.writeWorkout(workoutJSON);
    return true;
  }
}

export default Composer;
