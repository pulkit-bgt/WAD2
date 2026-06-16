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

    public static void main(String[] args) {
        // simple test to satisfy environments expecting a main method
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

        public Student(String department, String email, int id, String name) {
            this.department = department;
            this.email = email;
            this.id = id;
            this.name = name;
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


public boolean addStudent(Student student) {

    boolean status = false;

    String query =
            "INSERT INTO students(name,email,department) VALUES(?,?,?)";

    try (
            Connection con = DBConnection.getConnection();
            PreparedStatement ps = con.prepareStatement(query)
    ) {

        ps.setString(1, student.getName());
        ps.setString(2, student.getEmail());
        ps.setString(3, student.getDepartment());

        status = ps.executeUpdate() > 0;

    } catch (Exception e) {
        e.printStackTrace();
    }

    return status;
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


public class Dashboard extends JFrame {

    public Dashboard() {

        setTitle("Campus Pulse Dashboard");
        setSize(600,400);

        setLocationRelativeTo(null);
    }
}

/*main class to run the application or output f'unction*/


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



/*code for submitted reports*/

public class Report {
    private int reportId;
    private String title;
    private String category;
    private String submittedBy;
    private String status;
    private String submittedDate;

    public Report(int reportId, String title, String category,
                  String submittedBy, String status, String submittedDate) {
        this.reportId = reportId;
        this.title = title;
        this.category = category;
        this.submittedBy = submittedBy;
        this.status = status;
        this.submittedDate = submittedDate;
    }

    public int getReportId() {
        return reportId;
    }

    public String getTitle() {
        return title;
    }

    public String getCategory() {
        return category;
    }

    public String getSubmittedBy() {
        return submittedBy;
    }

    public String getStatus() {
        return status;
    }

    public String getSubmittedDate() {
        return submittedDate;
    }
}

/* dasboard service */

import java.util.ArrayList;
import java.util.List;

public class DashboardService {

    public List<Report> getSubmittedReports() {

        // Replace with database query
        List<Report> reports = new ArrayList<>();

        reports.add(new Report(
                101,
                "Broken Classroom Projector",
                "Infrastructure",
                "Rahul Kumar",
                "Submitted",
                "2026-06-15"
        ));

        reports.add(new Report(
                102,
                "Library WiFi Issue",
                "Technology",
                "Ananya Singh",
                "Submitted",
                "2026-06-15"
        ));

        return reports;
    }
}

/*dashboard controller */
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class DashboardController {

    private final DashboardService dashboardService = new DashboardService();

    @GetMapping("/api/dashboard/reports")
    public List<Report> getReports() {
        return dashboardService.getSubmittedReports();
    }
}

/*database connection or version*/

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "reports")
class report {

    @Id
    private Long reportId;
    private String title;
    private String category;
    private String submittedBy;
    private String status;
    private String submittedDate;

    // Getters and Setters
}

/* report repository */

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReportRepository extends JpaRepository<Report, Long> {

    List<Report> findByStatus(String status);
}


/*controller using database */

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final ReportRepository reportRepository;

    public DashboardController(ReportRepository reportRepository) {
        this.reportRepository = reportRepository;
    }

    @GetMapping("/submitted-reports")
    public List<Report> getSubmittedReports() {
        return reportRepository.findByStatus("Submitted");
    }
}
