const app = require('express');
import ConversationModel, { ChatUserModel } from '../../database/models/Conversation';
import ProductModel from '../../database/models/Product';
import ShopModel from '../../database/models/Shop';
import { requireLogin } from '../../middleware/http/requireLogin.js';


const router = app.Router();
const mongoose = require('mongoose');


router.get('/get-conversation',
  requireLogin,
  async (req, res, next) => {
    try {
      const { user_id, shop_id } = req.query;
      const conversation = await ConversationModel.findOne({ user_id: { "$in": [user_id, shop_id] } });

      if (conversation) return res.success(conversation);

      const user = req.user;
      const shop = await ShopModel.findById(shop_id);

      const chat_user = {
        [user_id]: new ChatUserModel({
          modelType: 'User',
          avatar: user.avatar,
          name: user.username,
          alias: null
        }),
        [shop_id]: new ChatUserModel({
          modelType: 'Shop',
          avatar: shop.brand_image,
          name: shop.name,
          alias: null
        })
      }
      const newConversation = new ConversationModel({
        user_id: [user_id, shop_id],
        chat_user: chat_user,
        name: 'Trò chuyện mua hàng',
        mode: 'public'
      })

      await newConversation.save();

      return res.success(newConversation, 'Tạo cửa hàng thành công');
    } catch (error) {
      console.log(error)
      next(error)
    }
  })


router.get('/all-with-shop',
  requireLogin,
  async (req, res, next) => {
    try {
      const { user_id, shop_id } = req.query;
      // TODO: change
      const conversation = await ConversationModel.find({ user_id: { "$in": [user_id, shop_id] } });

      return res.success(conversation, 'Tạo cửa hàng thành công');
    } catch (error) {
      console.log(error)
      next(error)
    }
  })


module.exports = router;