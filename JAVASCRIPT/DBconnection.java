package db;
import java.sql.Connection;
import java.sql.DriverManager;

public class DBConnection
{

    private static final String URL =
            "jdbc:mysql://localhost:3306/campuspulse";

    private static final String USER = "root";
    private static final String PASSWORD = "root";

    public static Connection getConnection() {

        Connection con = null;

        try {

            Class.forName("com.mysql.cj.jdbc.Driver");

            con = DriverManager.getConnection(
                    URL,
                    USER,
                    PASSWORD
            );

            System.out.println("Database Connected");

        } catch (Exception e) {
            e.printStackTrace();
        }

        return con;
    }
}
/* student model for student details */

package model;

public class Student {

    private int id;
    private String name;
    private String email;
    private String department;

    public Student() {}

    public Student(int id,
                   String name,
                   String email,
                   String department) {

        this.id = id;
        this.name = name;
        this.email = email;
        this.department = department;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }
}


/*student DAO(Data Access Object) for database operations related to student details*/
package dao;

import db.DBConnection;
import model.Student;

import java.sql.Connection;
import java.sql.PreparedStatement;

public class StudentDAO {

    public boolean addStudent(Student student) {

        boolean status = false;

        try {

            Connection con =
                    DBConnection.getConnection();

            String query =
                    "INSERT INTO students(name,email,department)"
                            + " VALUES(?,?,?)";

            PreparedStatement ps =
                    con.prepareStatement(query);

            ps.setString(1, student.getName());
            ps.setString(2, student.getEmail());
            ps.setString(3,
                    student.getDepartment());

            int rows = ps.executeUpdate();

            if(rows > 0)
                status = true;

        } catch(Exception e) {
            e.printStackTrace();
        }

        return status;
    }
}

/*Event model for event details*/


package model;

public class Event {

    private int id;
    private String title;
    private String date;
    private String description;

    public Event(){}

    public Event(int id,
                 String title,
                 String date,
                 String description) {

        this.id = id;
        this.title = title;
        this.date = date;
        this.description = description;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(
            String description) {
        this.description = description;
    }
}


/* logic screen or transiton screen for adding student and event details */



package ui;

import javax.swing.*;
import java.awt.*;

public class LoginFrame extends JFrame {

    JTextField usernameField;
    JPasswordField passwordField;
    JButton loginBtn;

    public LoginFrame() {

        setTitle("Campus Pulse Login");

        setSize(400,300);

        setLayout(new GridLayout(3,2));

        add(new JLabel("Username"));

        usernameField =
                new JTextField();

        add(usernameField);

        add(new JLabel("Password"));

        passwordField =
                new JPasswordField();

        add(passwordField);

        loginBtn =
                new JButton("Login");

        add(loginBtn);

        loginBtn.addActionListener(e -> {

            String username =
                    usernameField.getText();

            String password =
                    String.valueOf(
                            passwordField.getPassword());

            if(username.equals("admin")
                    && password.equals("admin")) {

                new Dashboard();

                dispose();

            } else {

                JOptionPane.showMessageDialog(
                        null,
                        "Invalid Login"
                );
            }
        });

        setVisible(true);
        setDefaultCloseOperation(EXIT_ON_CLOSE);
    }
}


/*dashboard for admin to add student and event details*/

package ui;

import javax.swing.*;

public class Dashboard extends JFrame {

    public Dashboard() {

        setTitle("Campus Pulse Dashboard");

        setSize(600,400);

        JMenuBar bar = new JMenuBar();

        JMenu studentMenu =
                new JMenu("Students");

        JMenu eventMenu =
                new JMenu("Events");

        JMenu noticeMenu =
                new JMenu("Notices");

        bar.add(studentMenu);
        bar.add(eventMenu);
        bar.add(noticeMenu);

        setJMenuBar(bar);

        JLabel label =
                new JLabel(
                        "Welcome to Campus Pulse",
                        SwingConstants.CENTER
                );

        add(label);

        setVisible(true);

        setDefaultCloseOperation(
                EXIT_ON_CLOSE
        );
    }
}

/*main class to run the application or output f'unction*/

import ui.LoginFrame;

public class Main {

    public static void main(String[] args) {

        new LoginFrame();
    }
}

/*feedback form for students to submit their feedback on campus events and facilities*/

package feed;

public class Feedback {

    private int feedbackId;
    private int studentId;
    private String studentName;
    private String message;
    private int rating;

    public Feedback() {
    }

    public Feedback(int studentId,
                    String studentName,
                    String message,
                    int rating) {

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

