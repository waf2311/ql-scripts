const axios = require('axios');
const notify = require('../sendNotify');

function request(api, method, data) {
  return new Promise(async (resolve) => {
    try {
      let url = `https://aiqicha.baidu.com/${api}`;
      if (method == 'get')
        res = await axios.get(url, {
          headers,
        });
      if (method == 'post')
        res = await axios.post(url, data, {
          headers,
        });
      if (res.data.status == 0) console.log('    操作成功');
      else console.log('    ' + res.data.msg);
      resolve(res.data);
    } catch (err) {
      console.log(err);
    }
    resolve();
  });
}

const headers = {
  'User-Agent':
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Safari/537.36',
  referer: 'https://aiqicha.baidu.com/m/s?t=3&q=%E5%B0%8F%E7%B1%B3&VNK=e73b55ef',
  'X-Requested-With': 'XMLHttpRequest',
  Host: 'aiqicha.baidu.com',
  cookie:
    process.env.aqcCookies ||
    'BDUSS=5RbTZQeWozUlNNY0dhNUdHZFVuUGF1dndyR0hlbkJwNm95cnFuTUMwSERXQjlsSVFBQUFBJCQAAAAAAAAAAAEAAACDjZ0MNzQyODcwMTU4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMPL92TDy~dkbH;',
};

async function getExangeList() {
  let { status, data } = await request('/usercenter/getBenefitStatusAjax', 'get', headers);
  console.log(data);
  if (status == 0 && data.AQ03008) {
    notify.sendNotify('爱企查京东E卡', '有货了');
  }
}

getExangeList();
