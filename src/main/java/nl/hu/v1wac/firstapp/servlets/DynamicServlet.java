package nl.hu.v1wac.firstapp.servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(urlPatterns = "/DynamicServlet.do")
public class DynamicServlet extends HttpServlet{
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		int cijfer1 = Integer.parseInt(req.getParameter("cijfer1"));
		int cijfer2 = Integer.parseInt(req.getParameter("cijfer2"));
		String wiskundesymbool = req.getParameter("symbolen");
		int eindAntwoord = 0;

		if(wiskundesymbool.equals("plus")) {
			eindAntwoord = cijfer1 + cijfer2;
		}else if(wiskundesymbool.equals("min")) {
			eindAntwoord = cijfer1 - cijfer2;
		}else if(wiskundesymbool.equals("keer")) {
			eindAntwoord = cijfer1 * cijfer2;
		}else if(wiskundesymbool.equals("delen")) {
			eindAntwoord = cijfer1 / cijfer2;
		}
		
		PrintWriter out = resp.getWriter();
		resp.setContentType("text/html");
		out.println("<!DOCTYPE html>");
		out.println("<html>");
		out.println(" <title>Rekenmachine</title>");
		out.println(" <body>");
		out.println(" <h2>Rekenmachine</h2>");
		out.println(" <h2>Dit is het antwoord: " + eindAntwoord +"</h2>");
		out.println(" </body>");
		out.println("</html>");

		
	}
}
