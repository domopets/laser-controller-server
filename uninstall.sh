#!/bin/bash

systemctl stop LaserControllerServer.service
systemctl disable LaserControllerServer.service
rm /etc/systemd/system/LaserControllerServer.service
