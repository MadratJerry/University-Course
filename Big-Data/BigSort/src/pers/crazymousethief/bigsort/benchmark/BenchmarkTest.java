package pers.crazymousethief.bigsort.benchmark;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import pers.crazymousethief.bigsort.io.OrderedInputStream;
import pers.crazymousethief.bigsort.io.util.Helper;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.Vector;

class BenchmarkTest {

    private static final int limit = 100;
    private InputStream stream;

    @BeforeAll
    static void initAll() throws IOException {
        for (int i = 0; i < limit; i++) {
            try (OutputStreamWriter outputStream = new OutputStreamWriter(new FileOutputStream(i + ".txt"), StandardCharsets.UTF_8)) {
                int[] a = new int[1000];
                for (int j = 0; j < a.length; j++) a[j] = (int) (Math.random() * Integer.MAX_VALUE);
                Arrays.sort(a);
                for (var n : a) outputStream.append(String.valueOf(n)).append("\n");
            }
        }
    }

    @Test
    void multipleStreamTest() throws IOException {
        var v = new Vector<InputStream>();
        for (int i = 0; i < limit; i++)
            v.add(new FileInputStream(i + ".txt"));
        stream = new OrderedInputStream(v);
    }

    @Test
    void multipleStreamOneByOneTest() throws IOException {
        stream = getStream(limit - 1);
    }

    private OrderedInputStream getStream(int i) throws IOException {
        var v = new Vector<InputStream>();
        v.add(new FileInputStream(i + ".txt"));
        if (i > 0) v.add(getStream(i - 1));
        return new OrderedInputStream(v);
    }

    @AfterEach
    void tearDown() throws IOException {
        Helper.convertStreamToString(stream);
    }

    @AfterAll
    static void tearDownAll() throws IOException {
        for (int i = 0; i < limit; i++) {
            final boolean delete = new File(i + ".txt").delete();
            if (!delete) throw new IOException();
        }
    }
}
