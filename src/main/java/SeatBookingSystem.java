import java.util.Scanner;

public class SeatBookingSystem {
    private static boolean[][] seats = new boolean[10][10]; // 10x10 seating arrangement

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        while (true) {
            System.out.println("Enter 'book' to book a seat, 'cancel' to cancel a booking, or 'exit' to exit:");
            String input = scanner.nextLine();

            if (input.equals("book")) {
                bookSeat(scanner);
            } else if (input.equals("cancel")) {
                cancelBooking(scanner);
            } else if (input.equals("exit")) {
                break;
            } else {
                System.out.println("Invalid input. Please try again.");
            }
        }

        scanner.close();
    }

    private static void bookSeat(Scanner scanner) {
        System.out.println("Enter row number (1-10):");
        int row = scanner.nextInt();
        System.out.println("Enter seat number (1-10):");
        int seat = scanner.nextInt();

        if (isValidSeat(row, seat)) {
            if (seats[row - 1][seat - 1]) {
                System.out.println("Seat is already booked. Please choose another seat.");
            } else {
                seats[row - 1][seat - 1] = true;
                System.out.println("Seat successfully booked.");
            }
        } else {
            System.out.println("Invalid seat. Please enter a valid row and seat number.");
        }
    }

    private static void cancelBooking(Scanner scanner) {
        System.out.println("Enter row number (1-10):");
        int row = scanner.nextInt();
        System.out.println("Enter seat number (1-10):");
        int seat = scanner.nextInt();

        if (isValidSeat(row, seat)) {
            if (seats[row - 1][seat - 1]) {
                seats[row - 1][seat - 1] = false;
                System.out.println("Booking successfully cancelled.");
            } else {
                System.out.println("Seat is not booked. Please enter a valid seat number.");
            }
        } else {
            System.out.println("Invalid seat. Please enter a valid row and seat number.");
        }
    }

    private static boolean isValidSeat(int row, int seat) {
        return row >= 1 && row <= 10 && seat >= 1 && seat <= 10;
    }
}