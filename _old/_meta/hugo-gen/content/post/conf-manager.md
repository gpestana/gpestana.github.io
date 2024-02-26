---
title: "Notes on AWS ECS configuration and secret management done right"
date: '2018-07-17'
tags:
  - best-practices
  - devops
  - AWS
slug: aws-conf-management
draft: false
---

Best practices for managing secrets and configurations in ECS containers:

### Requirements:

- configurations and secrets stored in paramter store and/or S3 bucket;
- encrypt secrets;
- do not push configurations to git/version control system;
- transparent to apps (e.g. it should be completely transparent for backend; it
  should not have code for pulling configurations/secrets from anywhere) this
follows the 12 factor app style (https://12factor.net/);
- automatic reloads new configurations when these change upstream;

**envaws** (https://github.com/gpestana/envaws) created by me and presented at
the Nordics AWS conf. IMO, the best way to approach the problem: it completely
makes the handling of configurations and secrets transparent to the application.
In the Dockerfile, by running: `CMD envaws yarn start`, the envaws will fetch
the configurations from AWS parameterstore and/or S3 and populate the given
command process with the configurations as env variables. As a bonus, we get
also a polling mechanism out of the box: if the configurations change upstream,
the docker container is rebooted and fetches the new configurations.

**chamber** (https://github.com/segmentio/chamber) similar to envaws, but
without the poller (so it does not automatically reload if configurations
change); Needs more configuration; It is an overkill if we consider the
requirements above, since it has a lot more functionality.

**fetch configurations at start in container**: this option is not compliant with
the 'transparent for application' requirement. in this case, the ECS task would
have to run `aws` commands to fetch the configurations from AWS parameter store.
