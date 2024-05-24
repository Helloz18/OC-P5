# Yoga App !

# To perform tests

- Create a test database using the script for tests (scriptTest.sql) in ressources/sql folder of the main project
- Add a file application-test.properties in src/main/resources
- Add the following information in it (change by your information): 

```
  spring.datasource.url=jdbc:mysql://localhost:3306/nameOfYourTestDatabase?allowPublicKeyRetrieval=true
  spring.datasource.username=yourUsername
  spring.datasource.password=yourPassword
  spring.jpa.hibernate.ddl-auto=update

  spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL5InnoDBDialect
  spring.jpa.hibernate.naming.physical-strategy=org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl
  spring.jpa.show-sql=true
  oc.app.jwtSecret=openclassrooms
  oc.app.jwtExpirationMs=86400000
```
For launch and generate the jacoco code coverage:
> mvn clean test

For verify the code coverage:
> mvn verify
