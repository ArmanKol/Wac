package nl.hu.v1wac.firstapp.webservices;

import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObjectBuilder;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import nl.hu.v1wac.firstapp.model.Country;
import nl.hu.v1wac.firstapp.model.ServiceProvider;
import nl.hu.v1wac.firstapp.model.WorldService;

@Path("/countries")
public class WorldResource {
	
	@GET
	@Produces("application/json")
	public String getLanden() {
		WorldService service = ServiceProvider.getWorldService();
		JsonArrayBuilder jab = Json.createArrayBuilder();
		
		for(Country co : service.getAllCountries()) {
			JsonObjectBuilder job = Json.createObjectBuilder();
			job.add("Countries", co.getName());
			job.add("Code", co.getCode());
			
			jab.add(job);
		}
		
		JsonArray array = jab.build();
		return array.toString();
	}
	
	@GET
	@Path("{cde}")
	@Produces("application/json")
	public String getLandInformatie(@PathParam("cde") String code) {
		WorldService service = ServiceProvider.getWorldService();
		JsonArrayBuilder jab = Json.createArrayBuilder();
		for(Country co : service.getAllCountries()) {
			if(co.getCode().equals(code)) {
				JsonObjectBuilder job = Json.createObjectBuilder();
				job.add("Landnaam: ", co.getName());
				job.add("Hoofdstad", co.getCapital());
				job.add("Continent", co.getContinent());
				job.add("Populatie", co.getPopulation());
				
				jab.add(job);
				
			}
		}
		JsonArray array = jab.build();
		return array.toString();
	}
	
	@GET
	@Path("largestsurfaces")
	@Produces("application/json")
	public String grootsteOppervlakte() {
		WorldService service = ServiceProvider.getWorldService();
		JsonArrayBuilder jab = Json.createArrayBuilder();
		
		for(Country co : service.get10LargestSurfaces()) {
			JsonObjectBuilder job = Json.createObjectBuilder();
			job.add("Oppervlakte: ", co.getSurface());
			
			jab.add(job);
			
		}
		JsonArray array = jab.build();
		return array.toString();
	}
	
	@GET
	@Path("largestpopulation")
	@Produces("application/json")
	public String grootsteLanden() {
		WorldService service = ServiceProvider.getWorldService();
		JsonArrayBuilder jab = Json.createArrayBuilder();
		
		for(Country co : service.get10LargestPopulations()) {
			JsonObjectBuilder job = Json.createObjectBuilder();
			job.add("Populatie: ", co.getPopulation());
			
			jab.add(job);
			
		}
		JsonArray array = jab.build();
		return array.toString();
	}
	
}
