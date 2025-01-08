## DB Tables

# Doctors table
- id | integer | not null | primary key
- name | Varchar(50) | not null
- lastname | Varchar(50) | not null
- department | Varchar(100) | not null
- email | Varchar(100) | not null
- phone_number | Varchar(20) | not null
- address | Varchar(255) | not null
- description | text(250) | null


# Reviews table
- id | integer | not null | primary key
- doctor_id | integer | not null | foreign key (references doctors(id))
- username | varchar(50) | not null
- rating | integer | not null
- review_text | text | not null
- created_at | datetime | not null