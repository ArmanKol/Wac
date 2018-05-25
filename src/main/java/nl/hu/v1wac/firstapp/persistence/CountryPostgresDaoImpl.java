package nl.hu.v1wac.firstapp.persistence;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import nl.hu.v1wac.firstapp.model.Country;

public class CountryPostgresDaoImpl extends PostgresBaseDao implements CountryDao {
	
	@Override
	public boolean save(Country country) {
		boolean saved = false;
		try(Connection connection = super.getConnection()){
			String query = "insert into country(name,  code, capital, governmentform, region, surfacearea, population) values(?, ?, ?, ?, ?, ?, ?)";
			PreparedStatement stmt = connection.prepareStatement(query);
			stmt.setString(1, country.getName());
			stmt.setString(2, country.getCode());
			stmt.setString(3, country.getCapital());
			stmt.setString(4, country.getGovernment());
			stmt.setString(5, country.getRegion());
			stmt.setDouble(6, country.getSurface());
			stmt.setInt(7, country.getPopulation());
			
			if(stmt.executeUpdate() == 1) {
				saved = true;
				System.out.println(saved);
			}
			//stmt.executeUpdate();
		}catch(Exception e) {
			System.out.println(e);
		}
		return saved;
	}

	@Override
	public List<Country> findAll() {
		List<Country> list = new ArrayList<Country>();
		Country ctry = null;
		
		try (Connection connection = super.getConnection()){
			Statement stmt = connection.createStatement();
			ResultSet resultset = stmt.executeQuery("select code, iso3, name, capital, continent, region, surfacearea, population, governmentform, latitude, longitude from country order by name asc");
			
			while(resultset.next()) {
				ctry = new Country(resultset.getString("code"), resultset.getString("iso3"), resultset.getString("name"), resultset.getString("capital"), resultset.getString("continent"), resultset.getString("region"), resultset.getDouble("surfacearea"), resultset.getInt("population"), resultset.getString("governmentform"), resultset.getDouble("latitude"), resultset.getDouble("longitude"));
				list.add(ctry);
			}
			resultset.close();
			stmt.close();
		}catch(Exception e) {
			System.out.println(e);
		}
		return list;
	}

	@Override
	public Country findByCode(String code) {
		Country ctry = null;
		
		try (Connection connection = super.getConnection()){
			Statement stmt = connection.createStatement();
			ResultSet resultset = stmt.executeQuery("select code, iso3, name, capital, continent, region, surfacearea, population, governmentform, latitude, longitude from country where code = '" + code + "'");
			
			while(resultset.next()) {
				ctry = new Country(resultset.getString("code"), resultset.getString("iso3"), resultset.getString("name"), resultset.getString("capital"), resultset.getString("continent"), resultset.getString("region"), resultset.getDouble("surfacearea"), resultset.getInt("population"), resultset.getString("governmentform"), resultset.getDouble("latitude"), resultset.getDouble("longitude"));
			}
			resultset.close();
			stmt.close();
		}catch(Exception e) {
			System.out.println(e);
		}
		return ctry;
	}

	@Override
	public List<Country> find10LargestPopulations() {
		List<Country> listPopulations = new ArrayList<Country>();
		Country ctry = null;
		
		try (Connection connection = super.getConnection()){
			Statement stmt = connection.createStatement();
			ResultSet resultset = stmt.executeQuery("select name, population from country order by population desc limit 10");
			
			while(resultset.next()) {
				ctry = new Country(null, null, resultset.getString("name"), null, null, null, 0, resultset.getInt("population"), null, 0, 0);
				listPopulations.add(ctry);
			}
			resultset.close();
			stmt.close();
		}catch(Exception e) {
			System.out.println(e);
		}
		return listPopulations;
	}


	@Override
	public List<Country> find10LargstSurfaces() {
		List<Country> listSurfaces = new ArrayList<Country>();
		Country ctry = null;
		
		try (Connection connection = super.getConnection()){
			Statement stmt = connection.createStatement();
			ResultSet resultset = stmt.executeQuery("select name, surfacearea from country order by surfacearea desc limit 10");
			
			while(resultset.next()) {
				ctry = new Country(null, null, resultset.getString("name"), null, null, null, resultset.getDouble("surfacearea"), 0, null, 0, 0);
				listSurfaces.add(ctry);
			}
			resultset.close();
			stmt.close();
		}catch(Exception e) {
			System.out.println(e);
		}
		return listSurfaces;
	}

	@Override
	public boolean update(Country country) {
		boolean updated = false;
		try (Connection connection = super.getConnection()){
			String query = "update country set name = ?, capital = ?, region = ?, surfacearea = ?, population = ? where code = ?";
			PreparedStatement stmt = connection.prepareStatement(query);
			stmt.setString(1, country.getName());
			stmt.setString(2, country.getCapital());
			stmt.setString(3, country.getRegion());
			stmt.setDouble(4, country.getSurface());
			stmt.setInt(5, country.getPopulation());
			stmt.setString(6, country.getCode());
			
			if(stmt.executeUpdate() == 1) {
				updated = true;
			}
			stmt.executeUpdate();
		} catch(Exception e) {
			System.out.println(e);
		}
		return updated;
	}

	@Override
	public boolean delete(Country country) {
		boolean deleted = false;
		try (Connection connection = super.getConnection()){
			String query = "delete from country where code = ?";
			PreparedStatement stmt = connection.prepareStatement(query);
			stmt.setString(1, country.getCode());
			
			if(stmt.executeUpdate() == 1) {
				deleted = true;
			}
			stmt.executeUpdate();
		} catch(Exception e) {
			System.out.println(e);
		}
		return deleted;
	}

}
