package base;

import utils.Database;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public abstract class Model {
    protected static <T> List<T> query(Class<T> classObject, String sql, Object... paramsValue) {
        List<T> list = new ArrayList<>();
        try {
            Connection connection = Database.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            for (int i = 0; i < paramsValue.length; i++) {
                preparedStatement.setObject(i + 1, paramsValue[i]);
            }
            ResultSet resultSet = preparedStatement.executeQuery();
            ResultSetMetaData resultSetMetaData = resultSet.getMetaData();
            while (resultSet.next()) {
                T result = classObject.getDeclaredConstructor().newInstance();
                for (int i = 0; i < resultSetMetaData.getColumnCount(); i++) {
                    String columnName = resultSetMetaData.getColumnName(i + 1);
                    Object value = resultSet.getObject(columnName);
                    Field field = classObject.getDeclaredField(columnName);
                    field.setAccessible(true);
                    field.set(result, value);
                }
                list.add(result);
            }
        } catch (InstantiationException | IllegalAccessException | InvocationTargetException | NoSuchMethodException | SQLException | ClassNotFoundException | NoSuchFieldException e) {
            e.printStackTrace();
        }
        return list;
    }

    public static void update(Class<?> classObject, String sql, Object... paramsValue) {
        try {
            Connection connection = Database.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            for (int i = 0; i < paramsValue.length; i++)
                preparedStatement.setObject(i + 1, paramsValue[i]);
            preparedStatement.executeUpdate();
        } catch (SQLException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }

    protected static <T> T findOneById(Class<T> classObject, String id) {
        String name = classObject.getSimpleName().split("Bean")[0].toLowerCase();
        List<T> list = query(classObject, "SELECT * FROM " + name + " WHERE " + name + "Id = ? ", id);
        return list.isEmpty() ? null : list.get(0);
    }

    protected static <T> boolean deleteOneById(Class<T> classObject, String id) {
        if (findOneById(classObject, id) != null) {
            String name = classObject.getSimpleName().split("Bean")[0].toLowerCase();
            update(classObject, "DELETE FROM " + name + " WHERE " + name + "Id = ? ", id);
            return true;
        } else {
            return false;
        }
    }
}
