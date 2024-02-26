---
layout: post
title:  "kapacitor-unit: unit tests framework for TICKscripts"
date:   2017-02-01 13:04:14 +0100
categories: code kapacitor-unit
---

This post discusses ideas for a proof of concept for a unit test framework for Kapacitor’s TICKscripts and alerts. If you are not familiar with Kapacitor and the TICK script I really suggest you to go ahead and check [InfluxData’s website](https://www.influxdata.com/) and learn more about it! In short, the TICK stack is a time series data platform that allows you to easily store, analyse and act on time series data at scale.

When you rely heavily on the TICK stack to make sure your systems are up and running all the time, the amount of TICKscripts will potentially become harder to manage. In addition, every time you need to change the parameters of an alert – which can be quite often –, a lot of time is spent on making sure that the alert works as intended and that the TICKscript is correct.

When you rely heavily on the TICK stack to make sure your systems are up and running all the time, the amount of TICKscripts will potentially become harder to manage. In addition, every time you need to change the parameters of an alert – which can be quite often –, a lot of time is spent on making sure that the alert works as intended and that the TICKscript is correct.

When testing a task, you can always define multiple [recordings](https://docs.influxdata.com/kapacitor/v1/introduction/getting-started/) and replay them to check whether the task behaves as expected or not. Though, this approach still has a couple of issues: there is a lot of manual work to record and replay the test data and it is not easy to keep the recordings up to date with changing TICKscripts.

Another problem with manually testing the TICKscripts is the amount of manual (or funny scripting) needed to load the tasks, enable, replay recordings, check the results, and tear down test databases. All of these actions should be made against a non production Influxdb/Kapacitor.

In this blog post, I propose way to test TICKscripts in an automated way, using kapacitor-unit.

### Reasons for using kapacitor-unit

1. When you rely heavily on the TICK stack to make sure your systems are up and running all the time, the amount of TICKscripts will potentially become harder to manage.
2. When creating new (and complex) TICKscripts, it is hard to test all possible cases before getting the script into production. Record and replay features are helpful, but still require a lot of manual work and a reliable set of recorded data, which might not be easy to get.
3. In addition, every time you need to change the parameters of an alert – which can be quite often –, a lot of time is spent on making sure that the alert works as intended and that the TICKscript is correct.
4. Currently, there is no easy way to run tests over multiple TICKscripts, check the results and provide proper reporting.

### The idea

The main goal of kapacitor-unit is to streamline and make it easier to run a battery of tests against TICKscripts. A TICKscript should be tested independently. There should be an easy and streamlined way to define the data to run in the tests, compare the Kapacitor results with the expected results and provide test reporting. All the tests whould against a dedicated Kapacitor.

### How to use it

First, define test definitons in a test configuration file:

```
# Test case for alert_weather.tick
tests:
   # This is the configuration for a test case. The 'name' must be unique in the
   # same test configuration. 'description' is optional
  - name: Alert weather:: warning
    description: Task should trigger Warning when temperature raises about 80 

    # 'task_script' defines the name of the file of the tick script to be loaded
    # when running the test
    task_script: alert_weather.tick

    db: weather
    rp: default 

     # 'data' is an array of data in the line protocol
    data:
      - weather,location=us-midwest temperature=75
      - weather,location=us-midwest temperature=82

    # Alert that should be triggered by Kapacitor when test data is running 
    # against the task
    expects: warning


  - name: Alert no. 2
    task_id: alert_weather.tick
    db: weather
    rp: default 
    data:
      - weather,location=us-midwest temperature=80
      - weather,location=us-midwest temperature=82
    expects: warning
```

After installing kapacitor-unit with the go tooling (go install github.com/gpestana/kapacitor-unit/kapacitor-unit), provide the test configuration file and kapacitor hosts. Optionally, you can provide a path for the directory where the TICKscripts are. If this path is not provided, kapacitor-unit assumes that the TICKscripts are loaded and enabled already.

To run the tests:

```
kapacitor-unit -kapacitor http://localhost:9092 -dir ../tickscripts -tests tests_conf.yaml
```

A good practice is to run a disposable Kapacitor for running the taks and load the test data. This can be easily done with docker, so a ready-to-use Docker configurations is also part of the project.

### Wrapping up

For now, these are the main ideas behind the kapacitor-unit. The main goal of kapacitor-unit is to make it easy and automated to test TICKscripts. To check how kapacitor-unit development is going, check [github.com/gpestana/kapacitor-unit](https://github.com/gpestana/kapacitor-unit).


