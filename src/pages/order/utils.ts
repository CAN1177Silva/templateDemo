import request from '@/request'

// 添加一个新的参数 timeout，表示超时时间（以毫秒为单位）
export async function fetchGet(url: string, callback: (arg0: number) => void, timeout: number) {
  // 创建一个 Promise，用于执行请求
  const fetchPromise = request.get(url);

  // 创建一个 Promise，用于执行超时操作
  const timeoutPromise = new Promise<void>((_, reject) => {
    setTimeout(() => {
      reject(new Error('请求超时'));
    }, timeout);
  });

  // 使用 Promise.race 来同时执行请求和超时计时器
  try {
    const res = await Promise.race([fetchPromise, timeoutPromise]);

    // 请求成功，执行回调
    if (res) {
      callback(1);
    }
  } catch (error) {
    // 请求超时或出现其他错误，执行相应操作
    console.error(error); // 打印错误信息
    // 这里可以执行其他操作，例如执行其他回调或显示错误消息给用户
  }
}
