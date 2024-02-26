---
layout: post
title:  "Managing credentials in production"
date:   2017-02-01 13:04:14 +0100
categories: devops best-practices
---

Every software must deal and manage credentials at some point. I will define credentials in the context of this article as secrets that must be protected at all costs, under risk of seriously compromising the security of production systems. There are several points to have in mind when managing credentials of productions systems:

**Credentials storage should be kept secret by encryption and a strong access management**. Credentials must never be transported but stored. Never send credentials over email or any other means. Store the credentials and protect them with a strong and auditable access management. Any person or system who wants to access credentials must know where and how to get the credentials from and prove its identity.

**Credentials database must be regularly backed up and easily restored**. For obvious reasons. The backup must be explicitly and automatically updated when there is credential revocation.

**Credentials revocation should be fast**. This is important to swiftly respond when credentials are compromised.

**Credentials must have a single purpose and protect a limited domain**. This means that you should not use the same credential to protect different systems or domains, decreasing the danger when a credential is compromised. It is better to have multiple credentials for different domains and have an easy system to manage credentials than using few master credentials. Putting all eggs in one basket is too risky when it comes to credentials.

**Credentials must never, ever, be stored on a general purpose version control systems (VCS)**. Even if the VCS is private, it is hard to ensure that in the long run the current and old credentials are not accessible by people who should not. Some forget that ultimately, the VCS never forget and it’s easily searchable. It is obvious that you should be extra careful with pushing credentials upstream to public repositories, but still we witness a bunch of credentials being compromised everyday in GitHub.

### In practice
Although it may seem complex to setup a credential management system which respects all the principles mentioned above, there are open source projects which will make our life easier. [Consul](https://www.consul.io/) and [Vault](https://www.vaultproject.io/) by Hashicorp can be easily deployed as part of a credential management system which respects all the principles mentioned. In another post we’ll see how store and manage production credentials in a secure and usable way.

[Comments and discussion](https://news.ycombinator.com/item?id=15109637)
