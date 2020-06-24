import { requester } from '../plugins/axios'
class NLPService {

  sa_url = 'http://127.0.0.1:5000/api/sentiment-analysis';
  ner_url = 'http://127.0.0.1:5000/api/ner';

  static async sentiment_analysis(text) {
    const data = await requester.post('http://127.0.0.1:5000/api/sentiment-analysis', {
      content: text
    })
    return data.data;
  }


  static async ner(text) {

    const data = await requester.post('http://127.0.0.1:5000/api/ner', {
      content: text
    })
    return data.data;
  }

  static async IEforUser(text, user) {

    const result = await this.ner(text);
    const new_keywords = result.result.label || [];
    const current = user.interested || [];
    debugger;

    new_keywords.forEach(element => {
      let exited = false
      current.forEach(current_object => {
        if (current_object.keyword === element) {
          exited = true;
          current_object.times++;
        }
      })
      if (!exited) current.push({ keyword: element, times: 1 })
    });

    current.sort(function (x, y) { return -(x.times - y.times) });
    current.slice(0, 10);

    debugger;
    user.interested = current;
    await user.save();

    debugger;
    return user;
  }
}

export default NLPService;