public with sharing class customObjectController {
    @AuraEnabled(cacheable=true)
    public static List<Graduate_Student__c> getGraduateStudentList(){
        return [SELECT Id, Name, Degree__c FROM Graduate_Student__c];
    }


    @AuraEnabled
    public static void deleteRecord(String recordId) {
       
        Graduate_Student__c student = [SELECT Id, Name, Degree__c FROM Graduate_Student__c WHERE Id = :recordId];
        if(student != null) {
            delete student;
        }
    }

    @AuraEnabled
    public static void deleteRecord(String recordId) {
        Graduate_Student__c student = [SELECT Id, Name, Degree__c FROM Graduate_Student__c WHERE Id = :recordId];
        if(student != null) {
            delete student;
        }
    }

    @AuraEnabled
    public static void createRecord(String name, String degree){
        Graduate__c newStudent = new Graduate_Student__c(Name = name, Degree__c = degree);
        insert newStudent;
    }

    @AuraEnabled
    public static void updateRecord(String recordId, String name, String degree){
        Graduate_Student__c student = [SELECT Id, Name, Degree__c FROM Graduate_Student__c WHERE Id = :recordId];
        if(student != null) {
            student.Name = name;
            student.Degree__c = degree;
            update student;
        }
    }

    @AuraEnabled
    public static List<Graduate_Student__c> fetchRecords(Integer offSet, Integer pageSize, String searchItem){
        String searchQuery = '%' + searchItem + '%';
        List<Graduate_Student__c> result = new List<Graduate_Student__c>();

        for (Graduate_Student__c student : [SELECT Id, Name, Degree__c FROM Graduate_Student__c WHERE (Name LIKE :searchQuery OR Degree__c LIKE :searchQuery)]) {
            result.add(student);
        }

        result = result.subList(Math.max(0, offSet), Math.min(offSet + pageSize, result.size()));

        return result;
    }
}