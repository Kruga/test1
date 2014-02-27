/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
		
		document.getElementById("devicename").innerHTML = device.name;
		document.getElementById("version").innerHTML = device.phonegap;
		document.getElementById("mobileplatform").innerHTML = device.platform;
		document.getElementById("platformversion").innerHTML = device.version;
		document.getElementById("uuid").innerHTML = device.uuid;
		
		myFunction();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
	
};
function myFunction(){
	//Contacts
	var options = new ContactFindOptions();
	options.filter = "";
	options.multiple = "true";
	var fields = ["phoneNumbers", "name"];
	navigator.contacts.find(fields, onSuccess, onError, options);
	//SD Card
	window.resolveLocalFileSystemURI("file:///mnt/sdcard", onResolveSuccess, onErrorSD);
}
function onSuccess(contacts){
	var ul = document.getElementById("list");
	for(var index=0; index<contacts.length; index++){
		var name = contacts[index].name.formatted;
		var phoneNumber = contacts[index].phoneNumbers[0].value;
		var li = document.createElement('li');
		li.innerHTML = "<a href=\"tel://"+phoneNumber+"\">"+name+"</a>";
		ul.appendChild(li);
	}
}
function onError(error){
}
function onResolveSuccess(fileEntry){
	var directoryReader = fileEntry.createReader();
	directoryReader.readEntries(onSuccessSD, onErrorSD);
}
function onSuccessSD(entries){
	document.getElementById("loading").innerHTML = "";
	var ul = document.getElementById("file-listing");
	for(var index=0; index<entries.length; index++){
		var li = document.createElement('li');
		li.innerHTML = entries[index].name;
		ul.appendChild(li);
	}
}
function onErrorSD(error){
	alert('code: ' + error.code + '\nmessage: ' + error.message);
}