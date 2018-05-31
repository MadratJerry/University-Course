package base;

import utils.Database;

import java.beans.IntrospectionException;
import java.beans.PropertyDescriptor;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.sql.*;
import java.util.*;
import java.util.stream.Collectors;

public abstract class Model {
    private List<Field> primaryKeyList;

    public Model() {
        primaryKeyList = new ArrayList<>();
        for (Field field : this.getClass().getDeclaredFields()) {
            if (field.getAnnotation(PrimaryKey.class) != null) {
                primaryKeyList.add(field);
            }
        }
    }

    public <T extends Model> List<T> query(String sql, Object... params) {
        List<T> list = new ArrayList<>();
        try (Connection connection = Database.getConnection()) {
            PreparedStatement statement = connection.prepareStatement(sql);
            for (int i = 0; i < params.length; i++) statement.setObject(i + 1, params[i]);
            ResultSet resultSet = statement.executeQuery();
            ResultSetMetaData resultSetMetaData = resultSet.getMetaData();
            while (resultSet.next()) {
                @SuppressWarnings("unchecked")
                T result = (T) this.getClass().getDeclaredConstructor().newInstance();
                for (int i = 0; i < resultSetMetaData.getColumnCount(); i++) {
                    String columnName = resultSetMetaData.getColumnName(i + 1);
                    Object value = resultSet.getObject(columnName);
                    Field field = this.getClass().getDeclaredField(columnName);
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

    public int update(String sql, Object... paramsValue) {
        int count;
        try {
            Connection connection = Database.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            for (int i = 0; i < paramsValue.length; i++)
                preparedStatement.setObject(i + 1, paramsValue[i]);
            count = preparedStatement.executeUpdate();
        } catch (SQLException | ClassNotFoundException e) {
            e.printStackTrace();
            return 0;
        }
        return count;
    }

    public <T extends Model> boolean updateOneByPrimaryKey(T bean, Object... keys) {
//        String name = getTableName();
        HashMap<Field, Object> map = getKVMap(bean);
        List<Object> params = new ArrayList<>(map.values());
        params.addAll(Arrays.asList(keys));
        return update(
                String.format("UPDATE %s SET %s WHERE %s",
                        getTableName(),
                        map.keySet().stream().map((c) -> c.getName() + " = ?").collect(Collectors.joining(",")),
                        primaryKeyList.stream()
                                .map((f) -> String.format("%s = ?", f.getName())).collect(Collectors.joining(" AND "))
                ),
                params.toArray()) != 0;
    }

    public <T extends Model> List<T> findAll() {
        return query(String.format("SELECT * FROM %s", getTableName()));
    }

    public <T extends Model> List<T> findLike(Map<String, String[]> map) {
        if (map.isEmpty()) {
            return findAll();
        } else {
            return query(String.format("SELECT * FROM %s WHERE %s",
                    getTableName(),
                    map.entrySet().stream().map((e) -> String.format("%s LIKE '%%%s%%'", e.getKey(), e.getValue()[0])).collect(Collectors.joining(" OR "))
            ));
        }
    }

    public <T extends Model> T findOneByPrimaryKey(Object... keys) {
        List<T> list = query(
                String.format("SELECT * FROM %s WHERE %s", getTableName(),
                        primaryKeyList.stream()
                                .map((f) -> String.format("%s = ?", f.getName())).collect(Collectors.joining(" AND "))),
                keys);
        return list.isEmpty() ? null : list.get(0);
    }

    public <T extends Model> List<T> find(T bean) {
        HashMap<Field, Object> map = getKVMap(bean);
        return query(String.format("SELECT * FROM %s WHERE %s", getTableName(),
                map.keySet().stream().map((e) -> String.format("%s = ?", e.getName())).collect(Collectors.joining(" AND "))),
                map.values().toArray()
        );
    }

    public boolean deleteOneByPrimaryKey(Object... keys) {
        if (findOneByPrimaryKey(keys) != null) {
            return update(String.format("DELETE FROM %s WHERE %s", getTableName(),
                    primaryKeyList.stream()
                            .map((f) -> String.format("%s = ?", f.getName())).collect(Collectors.joining(" AND "))),
                    keys) != 0;
        } else {
            return false;
        }
    }

    public <T extends Model> boolean insertOne(T bean) {
        String name = getTableName();
        HashMap<Field, Object> map = getKVMap(bean);
        return update(String.format("INSERT INTO %s (%s) VALUES (%s)", name,
                map.keySet().stream().map(Field::getName).collect(Collectors.joining(", ")),
                map.keySet().stream().map((s) -> "?").collect(Collectors.joining(", "))),
                map.values().toArray()) != 0;
    }

    private <T extends Model> HashMap<Field, Object> getKVMap(T bean) {
        HashMap<Field, Object> map = new HashMap<>();
        for (Field f : this.getClass().getDeclaredFields()) {
            try {
                Object param = new PropertyDescriptor(f.getName(), this.getClass()).getReadMethod().invoke(bean);
                if (param != null)
                    map.put(f, param);
            } catch (IllegalAccessException | InvocationTargetException | IntrospectionException e) {
                e.printStackTrace();
            }
        }
        return map;
    }

    private String getTableName() {
        return this.getClass().isAnnotationPresent(TableName.class) ?
                this.getClass().getAnnotation(TableName.class).value() :
                this.getClass().getSimpleName();
    }

}
