package com.andresavva.revhome.main;

import java.net.ServerSocket;
import java.net.Socket;

import com.andresavva.revhome.tcp.ClientHandler;
import com.andresavva.revhome.util.Properties;

public class RevHome {

	public static void main(String[] args) {
		
		try {
			ServerSocket serverSocket = new ServerSocket(Properties.SERVER_PORT);
			
			while (true) {
				Socket client = serverSocket.accept();
				Thread serverThread = new Thread(new ClientHandler(client));
				serverThread.start();
				
			}
			

		} catch (Exception ex) {
			ex.printStackTrace();
			
		}
	}

}
