package nl.hu.v1wac.firstapp.persistence;

import nl.hu.v1wac.firstapp.model.Country;

public class Main {
	public static void main(String[] args) {
		CountryDao countryDaoImpl;
		
		for(Country countryDao : countryDaoImpl.findAll()) {
			System.out.println(countryDao);
		}
	}
}
