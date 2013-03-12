package com.andresavva.revhome.tcp;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.Socket;

public class ClientHandler implements Runnable {

	Socket server;
	BufferedReader reader;
	
	public ClientHandler(Socket server) throws IOException {
		this.server = server;
		
		reader = new BufferedReader(new InputStreamReader(server.getInputStream()));
	}
	
	public void run() {
		System.out.println("Got new connection from " + server.getRemoteSocketAddress());
		try {
			String line = "";
			while (line != null ) {
				line = reader.readLine();
				System.out.println(line);
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

}
