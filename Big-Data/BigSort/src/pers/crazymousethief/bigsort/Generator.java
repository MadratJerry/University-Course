package pers.crazymousethief.bigsort;

import java.io.*;
import java.nio.charset.StandardCharsets;

public class Generator {
    public static void main(String[] args) throws IOException {
        String fileName = args[0];
        int limit = Integer.parseInt(args[1]);
        int MAX = Integer.parseInt(args[2]);
        try (
                OutputStreamWriter outputStream = new OutputStreamWriter(new FileOutputStream(fileName), StandardCharsets.UTF_8)
        ) {
            for (int i = 0; i < limit; i++)
                outputStream.append(Integer.toString((int) (Math.random() * MAX))).append("\n");
        }
    }
}
