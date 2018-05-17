package nl.hu.v1wac.firstapp.persistence;

public class Main {
	public static void main(String[] arg) {
		CountryDao cDao = new CountryPostgresDaoImpl();
		
		System.out.println("TESTTEST");
		System.out.println(cDao.findAll());
	}
}
