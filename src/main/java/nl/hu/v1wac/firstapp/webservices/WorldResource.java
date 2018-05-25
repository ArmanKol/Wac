package nl.hu.v1wac.firstapp.webservices;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.security.RolesAllowed;
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObjectBuilder;
import javax.ws.rs.DELETE;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

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
			job.add("Land", co.getName());
			job.add("code", co.getCode());
			job.add("hoofdstad", co.getCapital());
			job.add("regio", co.getRegion());
			job.add("oppervlakte", co.getSurface());
			job.add("inwoners", co.getPopulation());
			
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
				job.add("Land", co.getName());
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
			job.add("Land", co.getName());
			job.add("Oppervlakte", co.getSurface());
			
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
			job.add("Land", co.getName());
			job.add("Populatie", co.getPopulation());
			
			jab.add(job);
			
		}
		JsonArray array = jab.build();
		return array.toString();
	}
	
	@RolesAllowed("user")
	@DELETE
	@Path("{cde}")
	@Produces("application/json")
	public Response deleteCountry(@PathParam("cde") String code) {
		if(!ServiceProvider.getWorldService().deleteCountry(code)) {
			return Response.status(404).build(); 
		}
		return Response.ok().build();
	}
	
	@RolesAllowed("user")
	@PUT
	@Path("{cde}")
	@Produces("application/json")
	public Response updateCountry(@PathParam("cde") String code,
								@FormParam("wijzigLand") String land,
								@FormParam("wijzigHoofdstad") String hfdstad,
								@FormParam("wijzigRegio") String reg,
								@FormParam("wijzigOppervlakte") double opp,
								@FormParam("wijzigInwoners") int inw) {
		Country country = ServiceProvider.getWorldService().updateCountry(code, land, hfdstad, reg, opp, inw);
		
		if(country == null) {
			Map<String, String> messages = new HashMap<String, String>();
			messages.put("error", "Land bestaat niet");
			return Response.status(409).entity(messages).build();
		}
		return Response.ok(country).build();
	}
	
	@RolesAllowed("user")
	@POST
	@Produces("application/json")
	public Response addCountry(@FormParam("nieuwLand") String land,
								@FormParam("nieuwHoofdstad") String hfdstad,
								@FormParam("nieuwRegio") String regio,
								@FormParam("nieuwOppervlakte") double opp,
								@FormParam("nieuwInwoners") int inw,
								@FormParam("nieuwLandcode") String landcode,
								@FormParam("nieuwBestuurvorm")String bestuurv) {
		Country newCountry = ServiceProvider.getWorldService().addCountry(land, landcode, hfdstad, bestuurv, regio, opp, inw);
		if(newCountry == null) {
			Map<String, String> messages = new HashMap<String, String>();
			messages.put("error", "Het opslaan is niet gelukt, waarschijnlijk heeft u geen unieke landcode");
			return Response.status(409).entity(messages).build();
		}
		return Response.ok(newCountry).build();
	}
}
