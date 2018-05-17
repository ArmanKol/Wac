package nl.hu.v1wac.firstapp.persistence;

import java.sql.Connection;

import javax.naming.InitialContext;
import javax.sql.DataSource;

public class PostgresBaseDao {
	protected final Connection getConnection() {
		Connection connection = null;
		
		try {
			InitialContext ic = new InitialContext();
			DataSource datasource = (DataSource) ic.lookup("java:comp/env/jdbc/PostgresDS");
			
			connection = datasource.getConnection();
		}catch(Exception e) {
			throw new RuntimeException(e);
		}
		
		return connection;
	}
}
