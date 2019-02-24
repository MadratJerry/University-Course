package base.repository;

import models.User;
import utils.Database;

import java.beans.IntrospectionException;
import java.beans.PropertyDescriptor;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
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

    public static <T extends Model> List<T> findAll(Class<T> tClass, int limit) {
        return query(tClass, String.format("SELECT * FROM %s LIMIT ?", getEntityName(tClass)), limit);
    }

    public static <T extends Model> List<T> findAll(Class<T> tClass) {
        return findAll(tClass, 500);
    }

    public static <T extends Model> List<T> find(T bean) {
        HashMap<Field, Object> map = getKVMap(bean);
        @SuppressWarnings("unchecked")
        Class<T> tClass = (Class<T>) bean.getClass();
        return map.isEmpty() ? new ArrayList<>() : query(tClass,
                String.format("SELECT * FROM %s WHERE %s", getEntityName(bean.getClass()),
                        map.keySet().stream().map((e) -> String.format("%s = ?", e.getName())).collect(Collectors.joining(" AND "))),
                map.values().toArray()
        );
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

    public static <T extends Model> HashMap<Field, Object> getKVMap(T bean) {
        HashMap<Field, Object> map = new HashMap<>();
        for (Field f : bean.getClass().getDeclaredFields()) {
            try {
                Object param = new PropertyDescriptor(f.getName(), bean.getClass()).getReadMethod().invoke(bean);
                if (param != null)
                    map.put(f, param);
            } catch (IllegalAccessException | InvocationTargetException | IntrospectionException e) {
                e.printStackTrace();
            }
        }
        return map;
    }

    public static void main(String... args) {
        for (User user : Repository.findAll(User.class, 2))
            System.out.println(Repository.find(user).get(0).getUsername());
    }
}
