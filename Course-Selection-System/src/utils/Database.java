package utils;

import java.io.FileInputStream;
import java.io.IOException;
import java.sql.*;
import java.util.Properties;

public class Database {
    private static Properties properties;

    static {
        properties = new Properties();
        try {
            properties.load(new FileInputStream("jdbc.properties"));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static Connection getConnection() throws ClassNotFoundException, SQLException {
        Class.forName(properties.getProperty("jdbc.driverClassName"));
        return DriverManager.getConnection(
                properties.getProperty("jdbc.url"),
                properties.getProperty("jdbc.username"),
                properties.getProperty("jdbc.password"));
    }
}
