package models;

import base.Model;
import base.PrimaryKey;

import java.util.Date;
import java.util.List;
import java.util.Map;

public class Book extends Model {
    @PrimaryKey
    private Integer bookId;
    private String bookName;
    private String author;
    private String translator;
    private Float price;
    private String ISBN;
    private Date publishTime;
    private String publishCompany;
    private int state;
    private String enteringPerson;
    private Date enteringDate = new Date();

    @Override
    public <T extends Model> List<T> findLike(Map<String, String[]> map) {
        return super.findLike(map);
    }

    public Integer getBookId() {
        return bookId;
    }

    public void setBookId(Integer bookId) {
        this.bookId = bookId;
    }

    public String getBookName() {
        return bookName;
    }

    public void setBookName(String bookName) {
        this.bookName = bookName;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getTranslator() {
        return translator;
    }

    public void setTranslator(String translator) {
        this.translator = translator;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public String getISBN() {
        return ISBN;
    }

    public void setISBN(String ISBN) {
        this.ISBN = ISBN;
    }

    public Date getPublishTime() {
        return publishTime;
    }

    public void setPublishTime(Date publishTime) {
        this.publishTime = publishTime;
    }

    public String getPublishCompany() {
        return publishCompany;
    }

    public void setPublishCompany(String publishCompany) {
        this.publishCompany = publishCompany;
    }

    public int getState() {
        return state;
    }

    public void setState(int state) {
        this.state = state;
    }

    public String getEnteringPerson() {
        return enteringPerson;
    }

    public void setEnteringPerson(String enteringPerson) {
        this.enteringPerson = enteringPerson;
    }

    public Date getEnteringDate() {
        return enteringDate;
    }

    public void setEnteringDate(Date enteringDate) {
        this.enteringDate = enteringDate;
    }
}
