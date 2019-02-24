package base.repository;

import utils.Database;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class Repository {
    public static <T extends Model> List<T> query(Class<T> tClass, String sql, Object... params) {
        List<T> list = new ArrayList<>();
        try (Connection connection = Database.getConnection()) {
            PreparedStatement statement = connection.prepareStatement(sql);
            for (int i = 0; i < params.length; i++) statement.setObject(i + 1, params[i]);
            ResultSet resultSet = statement.executeQuery();
            ResultSetMetaData resultSetMetaData = resultSet.getMetaData();
            while (resultSet.next()) {
                T result = tClass.getDeclaredConstructor().newInstance();
                for (int i = 0; i < resultSetMetaData.getColumnCount(); i++) {
                    String columnName = resultSetMetaData.getColumnName(i + 1);
                    Object value = resultSet.getObject(columnName);
                    Field field = tClass.getDeclaredField(columnName);
                    field.setAccessible(true);
                    field.set(result, value);
                }
                list.add(result);
            }
        } catch (ClassNotFoundException | SQLException | IllegalAccessException | InstantiationException | NoSuchMethodException | InvocationTargetException | NoSuchFieldException e) {
            e.printStackTrace();
        }
        return list;
    }

    public static <T extends Model> T findOneByPK(Class<T> tClass, Object... keys) {
        List<T> list = query(tClass,
                String.format("SELECT * FROM %s WHERE %s", getEntityName(tClass),
                        getPrimaryKeyList(tClass).stream()
                                .map((f) -> String.format("%s = ?", f.getName())).collect(Collectors.joining(" AND "))),
                keys);
        return list.isEmpty() ? null : list.get(0);
    }

    public static <T extends Model> String getEntityName(Class<T> tClass) {
        return tClass.getSimpleName();
    }

    public static <T extends Model> List<Field> getPrimaryKeyList(Class<T> tClass) {
        List<Field> primaryKeyList = new ArrayList<>();
        for (Field field : tClass.getDeclaredFields()) {
            if (field.getAnnotation(PrimaryKey.class) != null) {
                primaryKeyList.add(field);
            }
        }
        return primaryKeyList;
    }
}
