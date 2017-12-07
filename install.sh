#!/bin/bash

cp systemd-LaserControllerServer.service /etc/systemd/system/LaserControllerServer.service
systemctl enable LaserControllerServer.service
systemctl start LaserControllerServer.service
