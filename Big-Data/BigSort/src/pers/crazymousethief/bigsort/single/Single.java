package pers.crazymousethief.bigsort.single;

import pers.crazymousethief.bigsort.io.OrderedInputStream;
import pers.crazymousethief.bigsort.io.SortOutputStream;
import pers.crazymousethief.bigsort.io.util.Helper;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.Vector;

public class Single {
    private static int id = 0;

    public static void main(String[] args) throws IOException {
        String sourceFileName = args[0];
        String targetFileName = args[1];
        long splitSize = Integer.parseInt(args[2]);
        Helper.separate(splitSize, new FileInputStream(sourceFileName), () -> {
            OutputStream stream = null;
            try {
                stream = new SortOutputStream(splitSize, new FileOutputStream(id++ + ".txt"));
            } catch (IOException e) {
                e.printStackTrace();
            }
            return stream;
        });
        merge(targetFileName);
    }

    public static void merge(String fileName) throws IOException {
        var v = new Vector<InputStream>();
        for (int i = 0; i < id; i++)
            v.add(new FileInputStream(i + ".txt"));
        var stream = new OrderedInputStream(v);
        Util.inputStreamToWriter(stream, Util.getFileWriter(fileName));
        for (int i = 0; i < id; i++)
            new File(i + ".txt").delete();
    }

    private static class Util {
        static BufferedWriter getFileWriter(String fileName) throws IOException {
            return new BufferedWriter(new OutputStreamWriter(new FileOutputStream(fileName), StandardCharsets.UTF_8));
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
