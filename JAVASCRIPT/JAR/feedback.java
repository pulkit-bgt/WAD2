package com.resolvehub.model;

public class Feedback {

    private int feedbackId;
    private int studentId;
    private String studentName;
    private String message;
    private int rating;

    public Feedback() {
    }

    public Feedback(int studentId, String studentName, String message, int rating) {
        this.studentId = studentId;
        this.studentName = studentName;
        this.message = message;
        this.rating = rating;
    }

    public int getFeedbackId() {
        return feedbackId;
    }

    public void setFeedbackId(int feedbackId) {
        this.feedbackId = feedbackId;
    }

    public int getStudentId() {
        return studentId;
    }

    public void setStudentId(int studentId) {
        this.studentId = studentId;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }
}