package pers.crazymousethief.bigsort.single;

import pers.crazymousethief.bigsort.io.OrderedInputStream;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.Vector;

public class Single {
    private static int id = 0;

    public static void main(String[] args) throws IOException {
        String sourceFileName = args[0];
        String targetFileName = args[1];
        int splitSize = Integer.parseInt(args[2]);
        separate(sourceFileName, splitSize);
        merge(targetFileName);
    }

    public static void separate(String fileName, int splitSize) throws IOException {
        int[] a = new int[splitSize];
        try (var reader = Helper.getFileReader(fileName)) {
            String text;
            int index = 0;
            while ((text = reader.readLine()) != null) {
                a[index++] = Integer.parseInt(text);
                if (index == splitSize) {
                    Helper.save(a, index);
                    index = 0;
                }
            }
            if (index > 0)
                Helper.save(a, index);
        }
    }

    public static void merge(String fileName) throws IOException {
        var v = new Vector<InputStream>();
        for (int i = 0; i < id; i++)
            v.add(new FileInputStream(i + ".txt"));
        var stream = new OrderedInputStream(v);
        Helper.inputStreamToWriter(stream, Helper.getFileWriter(fileName));
        for (int i = 0; i < id; i++)
            new File(i + ".txt").delete();
    }

    private static class Helper {
        static BufferedReader getFileReader(String fileName) throws IOException {
            return new BufferedReader(new InputStreamReader(new FileInputStream(fileName)));
        }

        static BufferedWriter getFileWriter(String fileName) throws IOException {
            return new BufferedWriter(new OutputStreamWriter(new FileOutputStream(fileName), StandardCharsets.UTF_8));
        }

        static void save(int[] a, int limit) throws IOException {
            Arrays.sort(a);
            try (BufferedWriter output = Helper.getFileWriter(id++ + ".txt")) {
                for (int i = 0; i < limit; i++)
                    output.write(Integer.toString(a[i]).concat("\n"));
            }
        }

        static void inputStreamToWriter(InputStream stream, BufferedWriter writer) throws IOException {
            try (var reader = new BufferedReader(new InputStreamReader(stream, StandardCharsets.UTF_8))) {
                String text;
                while ((text = reader.readLine()) != null)
                    writer.write(text.concat("\n"));
                writer.close();
            }
        }
    }
}
