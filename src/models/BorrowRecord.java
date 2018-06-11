package models;

import base.Model;
import base.PrimaryKey;
import com.alibaba.fastjson.JSONObject;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class BorrowRecord extends Model {
    @PrimaryKey
    private Integer recordId;
    private String borrowId;
    private Integer bookId;
    private Date borrowTime;
    private Date shouldTime;
    private Date returnTime;
    private Boolean state;

    public JSONObject checkRecord(String borrowId, String bookId) {
        User user = new User().findOneByPrimaryKey(borrowId);
        List<Book> bookList = new Book().query("SELECT * FROM Book WHERE bookId = ? AND state = ?", bookId, 0);
        if (user != null && bookList.size() != 0
                && user.getCount() < user.getMax()) {
            Map<String, Object> json = new HashMap<>();
            json.put("borrowId", borrowId);
            json.put("bookId", bookId);
            json.put("bookName", bookList.get(0).getBookName());
            json.put("endTime", new Date(new Date().getTime() + user.getTime() * 1000 * 60 * 60 * 24));
            return new JSONObject(json);
        }
        return null;
    }

    @Override
    public <T extends Model> boolean insertOne(T bean) {
        BorrowRecord record = (BorrowRecord) bean;
        record.setBorrowTime(new Date());
        User user = new User().findOneByPrimaryKey(record.getBorrowId());
        record.setShouldTime(new Date(new Date().getTime() + 60 * 60 * 24 * 1000 * user.getMax()));
        record.setState(false);
        return super.insertOne(bean);
    }

    public Integer getRecordId() {
        return recordId;
    }

    public void setRecordId(Integer recordId) {
        this.recordId = recordId;
    }

    public String getBorrowId() {
        return borrowId;
    }

    public void setBorrowId(String borrowId) {
        this.borrowId = borrowId;
    }

    public Integer getBookId() {
        return bookId;
    }

    public void setBookId(Integer bookId) {
        this.bookId = bookId;
    }

    public Date getBorrowTime() {
        return borrowTime;
    }

    public void setBorrowTime(Date borrowTime) {
        this.borrowTime = borrowTime;
    }

    public Date getShouldTime() {
        return shouldTime;
    }

    public void setShouldTime(Date shouldTime) {
        this.shouldTime = shouldTime;
    }

    public Date getReturnTime() {
        return returnTime;
    }

    public void setReturnTime(Date returnTime) {
        this.returnTime = returnTime;
    }

    public Boolean getState() {
        return state;
    }

    public void setState(Boolean state) {
        this.state = state;
    }
}
