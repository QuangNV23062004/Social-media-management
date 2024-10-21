const BaseDatabaseTransaction = require("./BaseDatabaseTransaction.js");
const UserRepository = require("./UserRepository.js");
class DatabaseTransaction extends BaseDatabaseTransaction {
  constructor() {
    super();
    this.userRepository = new UserRepository();
    this.categoryRepository = new CategoryRepository();
    this.myPlaylistRepository = new MyPlaylistRepository();
    this.messageRepository = new MessageRepository();
    this.videoRepository = new VideoRepository();
    this.roomRepository = new RoomRepository();
    this.commentRepository = new CommentRepository();
    this.receiptRepository = new ReceiptRepository();
    this.historyRepository = new HistoryRepository();
    this.streamRepository = new StreamRepository();
    this.giftRepository = new GiftRepository();
    this.giftHistoryRepository = new GiftHistoryRepository();
    this.exchangeRateRepository = new ExchangeRateRepository();
    this.advertisementRepository = new AdvertisementRepository();
  }
}

module.exports = DatabaseTransaction;
