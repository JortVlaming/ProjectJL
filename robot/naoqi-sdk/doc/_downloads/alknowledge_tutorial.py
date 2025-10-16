#! /usr/bin/env python
# -*- encoding: UTF-8 -*-

"""Example: Use ALKnowledge Module"""

import qi
import argparse
import sys


def main(session):
    """
    This example uses ALKnowledge module.
    """
    # Get the service ALKnowledge.

    knowledge_service = session.service("ALKnowledge")

    #Add triplets to the ontology
    knowledge_service.add("tutorial", "sky", "hasColor", "blue")
    knowledge_service.add("tutorial", "smurf", "hasColor", "blue")
    knowledge_service.add("tutorial", "smurf", "hasColor", "white")

    #Get subjects
    result = knowledge_service.getSubject("tutorial", "hasColor", "blue")
    print result #Should print ['sky', 'smurf']

    #Get predicates
    result = knowledge_service.getPredicate("tutorial", "sky", "blue")
    print result #Should print ['hasColor']

    #Get objects
    result = knowledge_service.getObject("tutorial", "smurf", "hasColor")
    print result #Should print ['blue', 'white']

    #Update
    result = knowledge_service.update("tutorial", "smurf", "hasColor", "red")
    result = knowledge_service.getObject("tutorial", "smurf", "hasColor")
    print result #Should print ['red']

    #Contains
    bool contains = knowledge_service.contains("tutorial", "smurf", "hasColor", "red")
    print contains #Should print True
    contains = knowledge_service.contains("tutorial", "smurf", "hasColor", "black")
    print contains #Should print False
    #Does smurf has any color ?
    contains = knowledge_service.contains("tutorial", "smurf", "hasColor", "*")
    print contains #Should print True

    #Remove
    result = knowledge_service.remove("tutorial", "smurf", "hasColor", "red")
    result = knowledge_service.contains("tutorial", "smurf", "hasColor","red")
    print result #Should print False

    #Query
    result = knowledge_service.query("tutorial", "sky", "hasColor", "?")
    print result #Should print ['blue']
    #Give me everything which has a color
    result = knowledge_service.query("tutorial", "?", "hasColor", "*")
    print result #Should print ['sky', 'smurf']

    #Query triplet
    #Give me every triplet where "hasColor" is the predicate
    result = knowledge_service.queryTriplet("tutorial", "*", "hasColor", "*")
    print result #Should print [['tutorial','sky','hasColor','blue'],['tutorial','smurf','hasColor','blue']]

    #Reset knoledge
    result = knowledge_service.resetKnowledge("tutorial")

    """
    Example using metadata
    (metadatas features are for now only availables for the "com.aldebaran.learning" domain)
    """

    domain = "com.aldebaran.learning"

    #Add triplet and metadatas to the ontology
    knowledge_service.add(domain, "user1", "eat", "pizza")
    knowledge_service.addMetadata(domain, "user1", "eat", "pizza", "with", "user2")
    knowledge_service.addMetadata(domain, "user1", "eat", "pizza", "with", "user3")

    #Query with metadata
    result =  knowledge_service.query(domain, "?", "eat", "pizza", "with", "user2")
    print result #Should print ['user1']

    #Query metadata
    result =  knowledge_service.query(domain, "user1", "eat", "pizza", "with")
    print result #Should print ['user2', 'user3']

    #Contains metadata
    result =  knowledge_service.updateMetadata(domain, "user1", "eat", "pizza", "with", "user4")
    result =  knowledge_service.queryMetadata(domain, "user1", "eat", "pizza", "with", "?")
    print result #Should print ['user4']

    #Contains metadata
    bool contains  =  knowledge_service.containsMetadata(domain, "user1", "eat", "pizza", "with", "user4")
    print contains #Should print True
    contains  =  knowledge_service.containsMetadata(domain, "user1", "eat", "pizza", "with", "user2")
    print contains #Should print False
    contains  =  knowledge_service.containsMetadata(domain, "user1", "eat", "pizza", "with", "*")
    print contains #Should print True

    #Remove metadata
    knowledge_service.removeMetadata(domain, "user1", "eat", "pizza", "with", "user4")
    contains  =  knowledge_service.containsMetadata(domain, "user1", "eat", "pizza", "with", "user4")
    print contains #Should print False

    #Get triplet ID
    tripletId = knowledge_service.getId(domain, "user1", "eat", "pizza")
    print tripletId #Should print an Id on th uuid format

    #Get triplet from ID
    triplet = knowledge_service.getTripletFromId(domain, tripletId)
    print triplet #Should print ['user1', 'eat', 'pizza']
    triplet = knowledge_service.getTripletFromId(domain, "10")
    print triplet #Should print []

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--ip", type=str, default="127.0.0.1",
                        help="Robot IP address. On robot or Local Naoqi: use '127.0.0.1'.")
    parser.add_argument("--port", type=int, default=9559,
                        help="Naoqi port number")

    args = parser.parse_args()
    session = qi.Session()
    try:
        session.connect("tcp://" + args.ip + ":" + str(args.port))
    except RuntimeError:
        print ("Can't connect to Naoqi at ip \"" + args.ip + "\" on port " + str(args.port) +".\n"
               "Please check your script arguments. Run with -h option for help.")
        sys.exit(1)
    main(session)
