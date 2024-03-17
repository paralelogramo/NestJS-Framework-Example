# Spring Framework Example

**This project is an example of a Spring Framework application. It includes JWT for token handling and path access. It was tested on a MySQL database that has the following schema.**

## Schema

#### Main Entities

* **Conference**
  * **Attributes:**
    * `id`: Unique identifier of the conference.
    * `name`: Name of the conference.

* **Edition**
  * **Attributes:**
    * `id`: Unique identifier of the edition.
    * `ref_Conference`: Identifier of the associated conference.
    * `year`: Year of the edition.
    * `date`: Date of the edition.
    * `country`: Country of the edition.

* **Researcher**
  * **Attributes:**
    * `id`: Unique identifier of the researcher.
    * `name`: Name of the researcher.
    * `surname`: Surname of the researcher.
    * `secSurname`: Second surname of the researcher.
    * `university`: University of the researcher.

* **Article**
  * **Attributes:**
    * `id`: Unique identifier of the article.
    * `title`: Title of the article.
    * `ref_Edition`: Identifier of the associated edition.

* **Author**
  * **Attributes:**
    * `id`: Unique identifier of the author.
    * `ref_Article`: Identifier of the associated article.
    * `ref_Researcher`: Identifier of the associated researcher.

## Contact

For any queries or concerns (even tips to improve this example), please reach out to:

Name: V. Rojas Aranda
Email: vrojasaranda@gmail.com

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details