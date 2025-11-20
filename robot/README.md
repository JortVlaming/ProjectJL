> [!important]
> This repository does not contain the naoqi and pynaoqi sdk's
> Without these sdk's it does not function.
> Please return when you have a copy (If you know where to find me come to me and ask, ill help)

# NaoWebsockets

This repository contains a websocket server that can connect to any number of Nao robots and can call any of the methods provided by the Nao sdk ([documentation](http://doc.aldebaran.com/2-8/naoqi/index.html)).

# How to install

This repository is designed to be run in a docker container using docker compose (The docker-compose.yml in this repository should suffice)

# How to use

Once you have the server up and running you can connect using any websocket client.

> [!note]
> The only client that has been verified to work is the [websocket-client](https://pypi.org/project/websocket-client/) module

## Preparing server to connect with robot

Before you can start calling methods on the robot you must first tell the server to connect to the robot.
This can be achieved simply by sending the server a message with the following format, make sure to replace `<ROBOT_IP>` with the ip of your robot.
```json
{"type": "connect", "robot": "<ROBOT_IP>"}
```

Once the server has connected it will respond with a confirmation message, after this you can start controlling the robot.
Response format:
```json
{"type": "connected"}
```

> [!caution]
> If you try to control the robot before you receive the connected confirmation you will run into issues

## Controlling the robot

> [!important]
> If multiple people try to control the robot at the same time you will run into issues.
> The server does not have any sort of queueing it simply runs whatever you send it

Once you've connected the server to the robot you can now start controlling the robot.

Control messages have a very simple format that you can use:
```json
{"type": "method", "robot": "<ROBOT_IP>", "service": "<SERVICE>", "method": "<METHOD>", "args": []}
```
