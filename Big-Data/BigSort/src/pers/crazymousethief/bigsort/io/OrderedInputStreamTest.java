package pers.crazymousethief.bigsort.io;

import org.junit.jupiter.api.Test;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Vector;

import static org.junit.jupiter.api.Assertions.assertEquals;

class OrderedInputStreamTest {

    private static final int MAX_SIZE = 1000;

    @Test
    void singleStreamTest() throws IOException {
        streamTest(1);
    }

    @Test
    void doubleStreamTest() throws IOException {
        streamTest(2);
    }

    @Test
    void multipleStreamTest() throws IOException {
        streamTest(100);
    }

    private void streamTest(int number) throws IOException {
        var v = new Vector<InputStream>();
        var list = new ArrayList<int[]>();
        for (int i = 0; i < number; i++)
            list.add(getRandomOrderedArray(MAX_SIZE));
        for (var a : list)
            v.add(new ByteArrayInputStream(
                    convertArrayToString(a)
                            .getBytes(StandardCharsets.UTF_8)));
        int[] a = new int[list.size() * MAX_SIZE];
        for (int i = 0; i < a.length; i++)
            a[i] = list.get(i / MAX_SIZE)[i % MAX_SIZE];
        Arrays.sort(a);
        assertEquals(convertArrayToString(a), convertStreamToString(new OrderedInputStream(v)));
    }

    private int[] getRandomOrderedArray(int size) {
        int[] a = new int[size];
        for (int i = 0; i < a.length; i++) a[i] = (int) (Math.random() * Integer.MAX_VALUE);
        Arrays.sort(a);
        return a;
    }


    private String convertStreamToString(OrderedInputStream stream) throws IOException {
        StringBuilder sb;
        try (var s = new BufferedReader(new InputStreamReader(stream))) {
            String number;
            sb = new StringBuilder();
            while ((number = s.readLine()) != null) {
                sb.append(number).append("\n");
            }
        }
        return sb.toString();
    }

    private String convertArrayToString(int[] a) {
        var sb = new StringBuilder();
        for (var number : a)
            sb.append(number).append("\n");
        return sb.toString();
    }
}
