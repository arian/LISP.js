#!/bin/sh

path=`dirname $0`

# node.js

echo "\n\033[1;33mrunning tests in node.js\033[0m\n"

node "${path}/SpecRunner.js"

result_node=$?

# browser

if [ ! -e "selenium-server.jar" ]; then
	echo "\n\033[1;33mdownloading selenium\033[0m\n"
	curl http://selenium.googlecode.com/files/selenium-server-standalone-2.18.0.jar > selenium-server.jar
fi

echo "\n\033[1;33mrunning tests with selenium\033[0m\n"

node "${path}/selenium.js"

result_selenium=$?


echo "\n\n\033[1;33mTest results:\033[0m\n"

if [ $result_node = 0 ]; then
	echo "\033[32m- succesfully ran the tests in node.js\033[0m"
else
	echo "\033[31m- node.js tests failed\033[0m"
fi

if [ $result_selenium = 0 ]; then
	echo "\033[32m- succesfully ran the tests with selenium\033[0m"
else
	echo "\033[31m- selenium tests failed\033[0m"
fi


exit `expr ${result_node} + ${result_selenium}`

