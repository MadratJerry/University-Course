package pers.crazymousethief.bigsort;

import java.io.*;
import java.nio.charset.StandardCharsets;

public class Generator {
    public static void main(String[] args) throws IOException {
        String fileName = args[0];
        int limit = Integer.parseInt(args[1]);

        try (BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(new BufferedOutputStream(new FileOutputStream(fileName)), StandardCharsets.UTF_8))) {
            for (int i = 0; i < limit; i++)
                writer.write(Integer.toString((int) (Math.random() * Integer.MAX_VALUE)).concat("\n"));
        }
    }
}
