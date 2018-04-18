package pers.crazymousethief.bigsort.io;

import org.junit.jupiter.api.Test;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Vector;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static pers.crazymousethief.bigsort.io.util.Helper.*;

class OrderedInputStreamTest {

    private static final int MAX_SIZE = 1000;

    @Test
    void singleStreamTest() throws IOException {
        createStreamTest(1);
    }

    @Test
    void doubleStreamTest() throws IOException {
        createStreamTest(2);
    }

    @Test
    void multipleStreamTest() throws IOException {
        createStreamTest(100);
    }

    private void createStreamTest(int number) throws IOException {
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
}
