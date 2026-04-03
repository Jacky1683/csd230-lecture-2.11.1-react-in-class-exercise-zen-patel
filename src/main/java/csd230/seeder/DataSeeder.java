package csd230.seeder;

import csd230.entities.BookEntity;
import csd230.entities.MagazineEntity;
import csd230.entities.UserEntity;
import csd230.repositories.BookRepository;
import csd230.repositories.MagazineRepository;
import csd230.repositories.UserRepository;
import net.datafaker.Faker;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.concurrent.TimeUnit;

@Component
public class DataSeeder implements CommandLineRunner {

    private final BookRepository bookRepository;
    private final MagazineRepository magazineRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final Faker faker;

    public DataSeeder(BookRepository bookRepository,
                      MagazineRepository magazineRepository,
                      UserRepository userRepository,
                      PasswordEncoder passwordEncoder) {
        this.bookRepository = bookRepository;
        this.magazineRepository = magazineRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.faker = new Faker();
    }

    @Override
    public void run(String... args) throws Exception {
        if (bookRepository.count() == 0) {
            seedBooks();
            seedMagazines();
        }

        if (userRepository.count() == 0) {
            seedUsers();
        }
    }

    private void seedBooks() {
        System.out.println("Seeding Books...");
        for (int i = 0; i < 10; i++) {
            BookEntity book = new BookEntity(
                    faker.book().title(),
                    faker.number().randomDouble(2, 10, 100),
                    faker.number().numberBetween(1, 50),
                    faker.book().author()
            );
            bookRepository.save(book);
        }
    }

    private void seedMagazines() {
        System.out.println("Seeding Magazines...");
        for (int i = 0; i < 5; i++) {
            LocalDateTime issueDate = faker.date().past(365, TimeUnit.DAYS)
                    .toInstant()
                    .atZone(ZoneId.systemDefault())
                    .toLocalDateTime();

            MagazineEntity mag = new MagazineEntity(
                    faker.book().publisher() + " Weekly",
                    faker.number().randomDouble(2, 5, 20),
                    faker.number().numberBetween(10, 100),
                    faker.number().numberBetween(100, 500),
                    issueDate
            );
            magazineRepository.save(mag);
        }
    }

    private void seedUsers() {
        System.out.println("Seeding Users...");

        UserEntity admin = new UserEntity(
                "admin",
                passwordEncoder.encode("admin123"),
                "ADMIN"
        );

        UserEntity user = new UserEntity(
                "user",
                passwordEncoder.encode("user123"),
                "USER"
        );

        userRepository.save(admin);
        userRepository.save(user);
    }
}