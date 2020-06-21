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
    const data = await requester.post(this.ner_url, {
      content: text
    })
    return data.data;
  }

}

export default NLPService;