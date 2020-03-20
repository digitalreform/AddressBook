from django.shortcuts import render

from django.http import JsonResponse
from django.http import HttpResponse
from .models import Contact



def CreateJson(data):
    '''
    Function that creates the json to be returned from database
    '''

    if len(data) > 0:
        return_data = {}
        # Loop through all records found
        for contact_counter in range(len(data)):
            email_addresses = {}
            phone_numbers = {}
            # Loop through every email address and phone number of each contact
            for address_counter in range(len(data[contact_counter].email)):
                email_addresses.update({str(address_counter) : data[contact_counter].email[address_counter]})
            for number_counter in range(len(data[contact_counter].phone)):
                phone_numbers.update({str(number_counter) : data[contact_counter].phone[number_counter]})
            # Setup the contact information
            contact = {
                "id" : data[contact_counter].id,
                "name" : data[contact_counter].name,
                "surname" : data[contact_counter].surname,
                "email" : email_addresses,
                "phone" : phone_numbers
            }
            # Add every contact to the return data
            return_data.update({contact_counter:contact})
        # Return contacts in JSON format
        return return_data
    else:
        # If no records are found return Not Found
        return 'Not Found'




def SearchContact(request):
    '''
    Function to search for records based on query string
    '''

    # Get the data based on the search criteria
    if ('name' in request.GET) and ('surname' in request.GET):
        data = Contact.objects.filter(name__icontains=request.GET['name']).filter(surname__icontains=request.GET['surname'])
    elif 'id' in request.GET:
        data = Contact.objects.filter(id=request.GET['id'])
    else:
        #If the required GET data is invalid, return
        return HttpResponse('Invalid')
    # If records are found, process 
    return_data = CreateJson(data)
    
    if return_data != 'Not Found':
        return JsonResponse(return_data)
    else:
        # If no records are found return Not Found
        return HttpResponse('Not Found')



def ViewAll(request):
    '''
    Function to retrieve all the records from the database
    '''

    # Get all the records from the DB
    data = Contact.objects.all().order_by("name")
    # If records are found, process and return them
    return_data = CreateJson(data)
    if return_data != 'Not Found':
        return JsonResponse(return_data)
    else:
        # If no records are found return Not Found
        return HttpResponse('Not Found')



def DeleteContact(request):
    '''
    Function to remove a record from the database
    '''

    if 'deleteID' in request.GET:
        Contact.objects.filter(id=request.GET['deleteID']).delete()
        return HttpResponse('Success')
    else:
        return HttpResponse('Invalid')



def AddContact(request):
    '''
    Function to add a ne record to the database
    '''

    newContact = Contact()
    newContact.name = request.GET['name']
    newContact.surname = request.GET['surname']
    newContact.email = request.GET['email']
    newContact.phone = request.GET['phone']
    newContact.save()
    return HttpResponse('Success')



def UpdateContact(request):
    '''
    Function to update an existing contact in the database
    '''
    
    existingContact = Contact.objects.get(id=request.GET['id'])
    existingContact.name = request.GET['name']
    existingContact.surname = request.GET['surname']
    existingContact.email = request.GET['email']
    existingContact.phone = request.GET['phone']
    existingContact.save()
    return HttpResponse('Success')



