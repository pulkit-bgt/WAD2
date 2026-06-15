import java.sql.*;
import java.util.Scanner;

public class CampusPulseDB {

    static final String URL = "jdbc:mysql://localhost:3306/campus_pulse";
    static final String USER = "root";
    static final String PASS = "your_password";

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        while (true) {

            System.out.println("\n===== CAMPUS PULSE (DB VERSION) =====");
            System.out.println("1. View Events");
            System.out.println("2. Register Event");
            System.out.println("3. View Registrations");
            System.out.println("4. Exit");
            System.out.print("Enter choice: ");

            int choice = sc.nextInt();
            sc.nextLine();

            switch (choice) {

                case 1:
                    viewEvents();
                    break;

                case 2:
                    registerEvent(sc);
                    break;

                case 3:
                    viewRegistrations();
                    break;

                case 4:
                    System.out.println("Exited.");
                    return;
            }
        }
    }

    // VIEW EVENTS
    static void viewEvents() {
        try {
            Connection con = DriverManager.getConnection(URL, USER, PASS);
            String query = "SELECT * FROM events";
            PreparedStatement ps = con.prepareStatement(query);
            ResultSet rs = ps.executeQuery();

            System.out.println("\n--- EVENTS ---");
            while (rs.next()) {
                System.out.println(
                        rs.getInt("id") + ". " +
                        rs.getString("name") + " | " +
                        rs.getString("event_date")
                );
            }

            con.close();

        } catch (Exception e) {
            System.out.println(e);
        }
    }

    // REGISTER EVENT
    static void registerEvent(Scanner sc) {
        try {
            Connection con = DriverManager.getConnection(URL, USER, PASS);

            System.out.print("Enter your name: ");
            String name = sc.nextLine();

            System.out.print("Enter event ID: ");
            int eventId = sc.nextInt();

            String query = "INSERT INTO registrations(student_name, event_id) VALUES(?, ?)";
            PreparedStatement ps = con.prepareStatement(query);
            ps.setString(1, name);
            ps.setInt(2, eventId);

            int result = ps.executeUpdate();

            if (result > 0) {
                System.out.println("Registration successful!");
            }

        
            con.close();

        } catch (Exception e) {
            System.out.println("Error: " + e);
        }
    }

    // VIEW REGISTRATIONS
    static void viewRegistrations() {
        try {
            Connection con = DriverManager.getConnection(URL, USER, PASS);

            String query =
                "SELECT r.id, r.student_name, e.name " +
                "FROM registrations r JOIN events e ON r.event_id = e.id";

            PreparedStatement ps = con.prepareStatement(query);
            ResultSet rs = ps.executeQuery();

            System.out.println("\n--- REGISTRATIONS ---");
            while (rs.next()) {
                System.out.println(
                        rs.getInt(1) + ". " +
                        rs.getString(2) +
                        " -> " +
                        rs.getString(3)
                );
            }

            con.close();

        } catch (Exception e) {
            System.out.println(e);
        }
    }
}