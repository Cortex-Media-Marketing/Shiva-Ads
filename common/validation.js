const Joi = require('joi');

exports.Validation = (req, res, next) => {
  try {
    let path = req.route.path;
    let data = req.body;
    let schema;
    //===================================================admin ==========================================
    if (path == '/signUp') {
      schema = Joi.object({
        name: Joi.string().pattern(/([^\s])/i).required().messages({
          'string.pattern.base': 'Please provide a valid name',
          'any.required': 'Name is required',
        }),
        type: Joi.string().pattern(/^(s2medias|shivaAds)$/i).required().messages({
          'string.pattern.base': 'Please provide a valid type',
          'any.required': 'Admin type is required',
        }),
        email: Joi.string().email().required().messages({
          'string.email': 'Please provide a valid email',
          'any.required': 'Email is required',
        })

      });
    } else if (path == '/signIn') {
      schema = Joi.object({
        type: Joi.string().pattern(/^(s2medias|shivaAds)$/i).required().messages({
          'string.pattern.base': 'Please provide a valid type',
          'any.required': 'Admin type is required',
        }),
        email: Joi.string().email().required().messages({
          'string.email': 'Please provide a valid email',
          'any.required': 'Email is required',
        }),
        password: Joi.string().required().messages({
          'string.password': 'Please provide a valid password',
          'any.required': 'password is required',
        })
      });
    } else if (path == '/forgot_password') {
      schema = Joi.object({

        email: Joi.string().email().required().messages({
          'string.email': 'Please provide a valid email',
          'any.required': 'Email is required',
        })
      });
    } else if (path == '/verify_forgot_password') {
      schema = Joi.object({

        token: Joi.string().required().messages({
          'string.token': 'Please provide a valid token',
          'any.required': 'Token is required',
        }),
        password: Joi.string().required().messages({
          'string.password': 'Please provide a valid password',
          'any.required': 'password is required',
        }),
        confirmPassword: Joi.string().required().messages({
          'string.confirmPassword': 'Please provide a valid confirm password',
          'any.required': 'Confirm password is required',
        })
      });
    } else if (path == '/add_email_template') {
      schema = Joi.object({

        name: Joi.string().required().messages({
          'string.name': 'Please provide a valid name',
          'any.required': 'Template name is required',
        }),
        subject: Joi.string().required().messages({
          'string.subject': 'Please provide a valid subject',
          'any.required': 'Template subject is required ',
        }),
        body: Joi.string().required().messages({
          'string.body': 'Please provide a valid template body',
          'any.required': 'Template body is required',
        })
      });
    }

    //=================================================== Type =======================================
    else if (path == '/add_contact_type' || path == '/add_designation' || path == '/addNewsPaperCenter' || path == '/addDiscountCategory' || path == '/addNoticeType') {
      schema = Joi.object({

        name: Joi.string().required().messages({
          'string.name': 'Please provide a valid name',
          'any.required': 'Contact type name is required',
        })
      });
    }
    else if (path == '/editNewsPaper' || path == '/editNewsPaperCenter' || path == '/editDiscountCategory' || path == '/editNoticeType') {
      schema = Joi.object({

        _id: Joi.string().required().messages({
          'string._id': 'Please provide a valid _id',
          'any.required': '_id is required',
        }),
        name: Joi.string().required().messages({
          'string.name': 'Please provide a valid name',
          'any.required': 'Contact type name is required',
        })
      });
    }


    //=================================================== GST =======================================
    else if (path == '/addGST') {
      schema = Joi.object({

        percent: Joi.number().required().messages({
          'string.percent': 'Please provide a valid GST percent',
          'any.required': 'GST percent is required',
        })
      });
    }
    else if (path == '/editGST') {
      schema = Joi.object({

        _id: Joi.string().required().messages({
          'string._id': 'Please provide a valid _id',
          'any.required': '_id is required',
        }),
        percent: Joi.number().required().messages({
          'string.percent': 'Please provide a valid GST percent',
          'any.required': 'GST percent is required',
        })
      });
    }
    //=====================================================     Client    ==========================================
    else if (path == '/add_a_client') {

      schema = Joi.object({

        clientName: Joi.string().required().messages({
          'string.base': 'Please provide a valid name for the client',
          'any.required': 'Client name is required',
        }),
        regDate: Joi.date().iso().required().messages({
          'date.base': 'Please provide a valid date for regDate',
          'any.required': 'Registration date is required',
        }),

        businessCategory: Joi.string().required().messages({
          'string.base': 'Please provide a valid ObjectId for bussinessCategory',
          'any.required': 'Business category is required',
        }),

        groupCompany: Joi.boolean().optional(),
        parentClient: Joi.string().when('groupCompany', {
          is: true,
          then: Joi.string().required().messages({
            'string.base': 'Please provide a valid parent client name',
            'any.required': 'Parent client is required',
          }),
          otherwise: Joi.string().optional()
        }),
        clientType: Joi.string().when('groupCompany', {
          is: true,
          then: Joi.string().required().messages({
            'string.base': 'Please provide a valid client type',
            'any.required': 'Client type is required',
          }),
          otherwise: Joi.string().optional()
        }),

        discount: Joi.string().allow(''),
        dataSource: Joi.string().allow(''),
        addressLine1: Joi.string().allow(''),
        addressLine2: Joi.string().allow(''),
        addressLine3: Joi.string().allow(''),
        country: Joi.string().allow(''),
        state: Joi.string().allow(''),
        district: Joi.string().allow(''),
        pincode: Joi.string().allow(''),
        referredDate: Joi.date().iso().messages({
          'date.base': 'Please provide a valid date for referredDate',
          'date.default': 'Invalid default date for referredDate',
        }),
        referredBy: Joi.string().allow(''),
        groupCompany: Joi.boolean().allow(''),
        subAgent: Joi.string().allow(''),
        gstNo: Joi.string().allow(''),
        contactNumbers: Joi.array().items(
          Joi.object({
            contactPerson: Joi.string().allow(''),
            designation: Joi.string().allow(''),
            number: Joi.string().allow(''),
            contactType: Joi.string().allow(''),
            extension: Joi.string().allow(''),
            timingTo: Joi.string().allow(''),
            timingFrom: Joi.string().allow(''),
            primaryContact: Joi.boolean().allow('')
          })
        ),
        contactEmails: Joi.array().items(Joi.object({
          contactType: Joi.string().allow(''),
          contactPerson: Joi.string().allow('').messages({
            'string.base': 'Please provide a valid name for contact person',
          }),
          email: Joi.string().allow('').messages({
            'string.base': 'Please provide a valid email for contact person',
          }),
          designation: Joi.string().allow('').messages({
            'string.base': 'Please provide a valid designation for designation',
          }),
          primaryContact: Joi.boolean().allow('')

        }))

      });
    }
    else if (path == '/add_instant_client') {

      schema = Joi.object({

        clientName: Joi.string().required().messages({
          'string.base': 'Please provide a valid name for the client',
          'any.required': 'Client name is required',
        }),
        clientType: Joi.string().required().messages({
          'string.base': 'Please provide a valid client type',
          'any.required': 'Client type is required',
        }),

        district: Joi.string().allow(''),
        dataSource: Joi.string().allow(''),
        gstNo: Joi.string().allow(''),
        contactNumbers: Joi.array().items(
          Joi.object({
            number: Joi.string().allow(''),
            contactType: Joi.string().allow(''),
          })
        ),
        contactEmails: Joi.array().items(Joi.object({
          contactType: Joi.string().allow(''),
          email: Joi.string().allow('').messages({
            'string.base': 'Please provide a valid email for contact person',
          })


        }))

      });
    }
    else if (path == '/update_client_detail') {

      schema = Joi.object({

        clientId: Joi.string().allow(''),
        clientName: Joi.string().allow(''),
        regDate: Joi.string().allow(''),
        dataSource: Joi.string().allow(''),
        businessCategory: Joi.string().allow(''),
        groupCompany: Joi.boolean().optional(),
        parentClient: Joi.string().when('groupCompany', {
          is: true,
          then: Joi.string().required().messages({
            'string.base': 'Please provide a valid parent client name',
            'any.required': 'Parent client is required',
          }),
          otherwise: Joi.string().optional()
        }),
        clientType: Joi.string().when('groupCompany', {
          is: true,
          then: Joi.string().required().messages({
            'string.base': 'Please provide a valid client type',
            'any.required': 'Client type is required',
          }),
          otherwise: Joi.string().optional()
        }),

        discount: Joi.string().allow(''),
        addressLine1: Joi.string().allow(''),
        addressLine2: Joi.string().allow(''),
        addressLine3: Joi.string().allow(''),
        country: Joi.string().allow(''),
        state: Joi.string().allow(''),
        district: Joi.string().allow(''),
        pincode: Joi.string().allow(''),
        referredDate: Joi.date().iso().messages({
          'date.base': 'Please provide a valid date for referredDate',
          'date.default': 'Invalid default date for referredDate',
        }),
        referredBy: Joi.string().allow(''),
        gstNo: Joi.string().allow(''),
        contactNumbers: Joi.array().items(
          Joi.object({
            contactPerson: Joi.string().allow(''),
            designation: Joi.string().allow(''),
            number: Joi.string().allow(''),
            contactType: Joi.string().allow(''),
            extension: Joi.string().allow(''),
            timingTo: Joi.string().allow(''),
            primaryContact: Joi.boolean().allow(''),
            timingFrom: Joi.string().allow('')
          })
        ),
        contactEmails: Joi.array().items(Joi.object({
          contactPerson: Joi.string().allow(''),
          primaryContact: Joi.boolean().allow(''),
          contactType: Joi.string().allow(''),
          email: Joi.string().allow(''),
          designation: Joi.string().allow('')

        }))
      });
    }
    else if (path == '/addNewsPaperRO') {

      schema = Joi.object({
        roDate: Joi.string().required(),
        newsPaperName: Joi.string().required().messages({
          'string.base': 'Please provide a valid  news paper name',
          'any.required': 'news paper name is required',
        }),
        newsPaperCenter: Joi.string().required().messages({
          'string.base': 'Please provide a valid news paper center',
          'any.required': 'News paper center is required',
        }),
        typeClientNameHere: Joi.string().required().messages({
          'string.base': 'Please provide a valid  type client name here',
          'any.required': 'Client name is required',
        }),
        subAgent: Joi.string().required().messages({
          'string.base': 'Please provide a valid ObjectId for sub agent',
          'any.required': 'Sub agent is required',
        }),
        advtEditionType: Joi.string().required().messages({
          'string.base': 'Please provide a valid ObjectId for advt edition type',
          'any.required': 'Advt edition type is required',
        }),
        advtType: Joi.string().required().messages({
          'string.base': 'Please provide a valid advt type',
          'any.required': 'Advt type is required',
        }),
        displayAdvtType: Joi.boolean().optional(),
        editionsYouSelected: Joi.array().items(
          Joi.string().allow('')
        ),
        poNumber: Joi.string().allow(''),
        invoiceEditionName: Joi.string().allow(''),
        invoiceEditionArea: Joi.string().allow(''),
        roInsertionDate: Joi.string().allow(''),
        heightInCM: Joi.number().allow(''),
        widthInCM: Joi.number().allow(''),
        sqCM: Joi.number().allow(''),
        flatRateMedia: Joi.boolean().optional(),
        mediaRatePerSqCM: Joi.number().allow(''),
        flatRateClient: Joi.boolean().optional(),
        clientRatePerSqCM: Joi.number().allow(''),
        advertisementCaption: Joi.string().allow(''),
        byEmail: Joi.string().allow(''),
        prevSentMaterial: Joi.string().allow(''),
        advtIssueOrMalarOrOthers: Joi.string().allow(''),
        malarType: Joi.string().allow(''),
        advtHue: Joi.string().allow(''),
        advtHuePercentage: Joi.number().allow(''),
        advtHueMediaAmount: Joi.number().allow(''),
        advtHueClientAmount: Joi.number().allow(''),
        advtHueTotal: Joi.number().allow(''),
        advtHuePageNo: Joi.number().allow(''),
        advtPosition: Joi.string().allow(''),
        advtPositionPercentage: Joi.number().allow(''),
        advtPositionMediaAmount: Joi.number().allow(''),
        advtPositionClientAmount: Joi.number().allow(''),
        advtPositionTotal: Joi.number().allow(''),
        advtClientPosition: Joi.number().allow(''),
        paperCopies: Joi.number().allow(''),
        scheme: Joi.string().allow(''),
        extra: Joi.string().allow(''),
        specialInstructions1: Joi.string().allow(''),
        specialInstructions2: Joi.string().allow(''),
        specialDiscount: Joi.object().keys({
          percentage: Joi.number().allow(''),
          mediaAmount: Joi.number().allow(''),
          clientAmount: Joi.number().allow(''),
          discount: Joi.number().allow(''),
          discountCategory: Joi.string().allow(''),
          noticeType: Joi.string().allow('')
        }),
        clientDiscount: Joi.object().keys({
          percentage: Joi.number().allow(''),
          amount: Joi.number().allow(''),
          discount: Joi.number().allow(''),
          advertisementCoordinator: Joi.string().allow(''),

        }),

        remindForNextYear: Joi.boolean().optional(''),
        isReleased: Joi.boolean().optional(''),
        isCancelled: Joi.boolean().optional(''),
        isShifted: Joi.boolean().optional(''),
        isRoGenerated: Joi.boolean().optional(),
        roUrl: Joi.string().optional().allow(''),
        isClientRoGenerated: Joi.boolean().optional(),
        isVendorRoGenerated: Joi.boolean().optional(),
        clientRoUrl: Joi.string().optional().allow(''),
        vendorRoUrl: Joi.string().optional().allow(''),
        vendorId: Joi.string().optional().allow(''),
        validity: Joi.string().optional().allow(''),
        releaseDate: Joi.string().optional().allow(''),
        selectedGST: Joi.string().allow(''),
        freeAds: Joi.number().allow(''),
        clientApprovalRate: Joi.number().allow(''),
        totalGST: Joi.number().allow(''),
        totalWithGST: Joi.number().allow(''),
      });
    }
    else if (path == '/updateNewsPaperRO') {

      schema = Joi.object({

        _id: Joi.string().required().messages({
          'string.base': 'Please provide a valid _id',
          'any.required': '_id is required',
        }),
        roDate: Joi.string().allow(),
        newsPaperName: Joi.string().optional().allow('').messages({
          'string.base': 'Please provide a valid news paper name',
        }),
        newsPaperCenter: Joi.string().optional().allow('').messages({
          'string.base': 'Please provide a valid news paper center',
        }),
        typeClientNameHere: Joi.string().optional().allow('').messages({
          'string.base': 'Please provide a valid type client name here',
        }),
        subAgent: Joi.string().optional().allow('').messages({
          'string.base': 'Please provide a valid ObjectId for sub agent',
        }),
        advtEditionType: Joi.string().optional().allow('').messages({
          'string.base': 'Please provide a valid ObjectId for advt edition type',
        }),
        advtType: Joi.string().optional().optional().allow('').messages({
          'string.base': 'Please provide a valid advt type',
        }),
        displayAdvtType: Joi.boolean().optional(),
        editionsYouSelected: Joi.array().optional().items(
          Joi.string().optional().allow('')
        ),
        poNumber: Joi.string().optional().allow(''),
        invoiceEditionName: Joi.string().optional().allow(''),
        invoiceEditionArea: Joi.string().optional().allow(''),
        roInsertionDate: Joi.string().optional().allow(''),
        heightInCM: Joi.number().optional().allow(''),
        widthInCM: Joi.number().optional().allow(''),
        sqCM: Joi.number().optional().allow(''),
        flatRateMedia: Joi.boolean().optional(),
        isRoGenerated: Joi.boolean().optional(),
        roUrl: Joi.string().optional(),
        mediaRatePerSqCM: Joi.number().optional().allow(''),
        flatRateClient: Joi.boolean().optional(),
        clientRatePerSqCM: Joi.number().optional().allow(''),
        advertisementCaption: Joi.string().optional().allow(''),
        byEmail: Joi.string().optional().allow(''),
        prevSentMaterial: Joi.string().optional().allow(''),
        advtIssueOrMalarOrOthers: Joi.string().optional().allow(''),
        malarType: Joi.string().optional().allow(''),
        advtHue: Joi.string().optional().allow(''),
        advtHuePercentage: Joi.number().optional().allow(''),
        advtHueMediaAmount: Joi.number().optional().allow(''),
        advtHueClientAmount: Joi.number().optional().allow(''),
        advtHueTotal: Joi.number().optional().allow(''),
        advtHuePageNo: Joi.number().optional().allow(''),
        advtPosition: Joi.string().optional().allow(''),
        advtPositionPercentage: Joi.number().optional().allow(''),
        advtPositionMediaAmount: Joi.number().optional().allow(''),
        advtPositionClientAmount: Joi.number().optional().allow(''),
        advtPositionTotal: Joi.number().optional().allow(''),
        advtClientPosition: Joi.number().optional().allow(''),
        paperCopies: Joi.number().optional().allow(''),
        scheme: Joi.string().optional().allow(''),
        extra: Joi.string().optional().allow(''),
        specialInstructions1: Joi.string().optional().allow(''),
        specialInstructions2: Joi.string().optional().allow(''),
        specialDiscount: Joi.object().keys({
          percentage: Joi.number().allow(''),
          mediaAmount: Joi.number().allow(''),
          clientAmount: Joi.number().allow(''),
          discount: Joi.number().allow(''),
          discountCategory: Joi.string().allow(''),
          noticeType: Joi.string().allow('')
        }),
        clientDiscount: Joi.object().keys({
          percentage: Joi.number().allow(''),
          amount: Joi.number().allow(''),
          discount: Joi.number().allow(''),
          advertisementCoordinator: Joi.string().allow(''),

        }),

        remindForNextYear: Joi.boolean().optional(''),
        isReleased: Joi.boolean().optional(''),
        isCancelled: Joi.boolean().optional(''),
        isShifted: Joi.boolean().optional(''),
        validity: Joi.string().optional().allow(''),
        releaseDate: Joi.string().optional().allow(''),
        selectedGST: Joi.string().optional().allow(''),
        freeAds: Joi.number().optional().allow(''),
        clientApprovalRate: Joi.number().optional().allow(''),
        totalGST: Joi.number().optional().allow(''),
        totalWithGST: Joi.number().optional().allow(''),
        isCancelled: Joi.boolean().optional(''),
        isShifted: Joi.boolean().optional(''),
        isRoGenerated: Joi.boolean().optional(),
        roUrl: Joi.string().optional().allow(''),
        isClientRoGenerated: Joi.boolean().optional(),
        isVendorRoGenerated: Joi.boolean().optional(),
        clientRoUrl: Joi.string().optional().allow(''),
        vendorRoUrl: Joi.string().optional().allow(''),
        vendorId: Joi.string().optional().allow(''),
      });
    }
    else if (path == '/addADVTShiftingNPRO') {

      schema = Joi.object({
        npRoId: Joi.string().default('').required(),
        reason: Joi.string().default('').required(),
        shiftedRO: Joi.number().integer().min(1000000000).max(9999999999).optional()
      });
    }
    else if (path == '/updateADVTShiftingNPRO') {

      schema = Joi.object({
        _id: Joi.string().default('').required(),
        originalDate: Joi.string().default('').optional(),
        reason: Joi.string().default('').optional(),
        shiftedRO: Joi.number().integer().min(1000000000).max(9999999999).optional()
      });
    }
    
    else if (path == '/addTvRoSponsorship') {

      schema = Joi.object({
        roDate: Joi.string().required(),
        companyName: Joi.string().required(),
        clientName: Joi.string().required(),
        clientId: Joi.string().required(),
        channel: Joi.string().required(),
        agencyNameForBilling: Joi.string(),
        advertiserNameForBilling: Joi.string(),
        brandName: Joi.string(),
        campaignStartDate: Joi.date(),
        campaignEndDate: Joi.date(),
        campaignDays: Joi.number(),
        ratePer10Secs: Joi.number(),
        program: Joi.string(),
        sponsorship: Joi.string(),
        timeBand: Joi.string(),
        adDuration: Joi.number(),
        spotsPerDay: Joi.number(),
        totalSpots: Joi.number(),
        totalSeconds: Joi.number(),
        nettAmount: Joi.number(),
        gst: Joi.number(),
        totalPayableAfterTaxes: Joi.number(),
        tagLine: Joi.string(),
        note: Joi.string(),
        clientRate: Joi.number().required(),
        clientDiscountType: Joi.string().valid("TenSecRate4Client", "flatDiscount4Client", "flatRate4Client"),
        discountedValue4Client: Joi.number().optional(),
        clientBillingRate: Joi.number(),
        gst4Client: Joi.number(),
        nett4Client: Joi.number(),
        remindStatus: Joi.boolean().optional(),
        isRoGenerated: Joi.boolean().optional(),
        roUrl: Joi.string().optional().allow(''),
        isClientRoGenerated: Joi.boolean().optional(),
        isVendorRoGenerated: Joi.boolean().optional(),
        clientRoUrl: Joi.string().optional().allow(''),
        vendorRoUrl: Joi.string().optional().allow(''),
        vendorId: Joi.string().optional().allow(''),
      })


    }
    else if (path == '/updateTvRoSponsorship') {

      schema = Joi.object({
        _id: Joi.string().required(),
        roDate: Joi.string().allow(''),
        companyName: Joi.string().optional(),
        clientName: Joi.string().optional(),
        clientId: Joi.string().optional(),
        channel: Joi.string().optional(),
        agencyNameForBilling: Joi.string(),
        advertiserNameForBilling: Joi.string(),
        brandName: Joi.string(),
        campaignStartDate: Joi.date(),
        campaignEndDate: Joi.date(),
        campaignDays: Joi.number(),
        ratePer10Secs: Joi.number(),
        program: Joi.string().optional(),
        sponsorship: Joi.string().optional(),
        timeBand: Joi.string(),
        adDuration: Joi.number(),
        spotsPerDay: Joi.number(),
        totalSpots: Joi.number(),
        totalSeconds: Joi.number(),
        nettAmount: Joi.number(),
        gst: Joi.number(),
        totalPayableAfterTaxes: Joi.number(),
        tagLine: Joi.string(),
        note: Joi.string(),
        clientRate: Joi.number().required(),
        clientDiscountType: Joi.string().valid("TenSecRate4Client", "flatDiscount4Client", "flatRate4Client"),
        discountedValue4Client: Joi.number().optional(),
        clientBillingRate: Joi.number(),
        gst4Client: Joi.number(),
        nett4Client: Joi.number(),
        remindStatus: Joi.boolean().optional(),
        isRoGenerated: Joi.boolean().optional(),
        roUrl: Joi.string().optional().allow(''),
        isClientRoGenerated: Joi.boolean().optional(),
        isVendorRoGenerated: Joi.boolean().optional(),
        clientRoUrl: Joi.string().optional().allow(''),
        vendorRoUrl: Joi.string().optional().allow(''),
        vendorId: Joi.string().optional().allow(''),
      });
    }
    else if (path == '/addRadioFCT') {

      schema = Joi.object({
        companyName: Joi.string(),
        station: Joi.string(),
        agencyNameForBilling: Joi.string(),
        advertiserNameForBilling: Joi.string(),
        brandName: Joi.string(),
        campaignStartDate: Joi.date(),
        campaignEndDate: Joi.date(),
        campaignDays: Joi.number().integer().min(0),
        ratePer10Secs: Joi.number().min(0),
        timeBand: Joi.string(),
        adDuration: Joi.number().min(0),
        spotsPerDay: Joi.number().integer().min(0),
        totalSpots: Joi.number().integer().min(0),
        totalSeconds: Joi.number().integer().min(0),
        nettAmount: Joi.number().min(0),
        gst: Joi.number().min(0),
        totalPayableAfterTaxes: Joi.number().min(0),

        coSponsor: Joi.boolean().default(false),
        csProgramDate: Joi.string().optional().allow(''),
        csSelectedPrograms: Joi.array().items(Joi.string()).empty().optional(),
        namingRights: Joi.boolean().default(false),
        nrProgramDate: Joi.string().optional().allow(''),
        nrSelectedPrograms: Joi.array().items(Joi.string()).empty().optional(),
        dayBranding: Joi.boolean().default(false).optional(),
        dbProgramDate: Joi.string().optional(),
        assocDayBranding: Joi.boolean().default(false).optional(),
        adbProgramDate: Joi.string().optional(),

        tagLine: Joi.string(),
        paymentTermsWithChequeDetails: Joi.string(),
        attachmentFile: Joi.string(),
        note: Joi.string(),
        clientRate: Joi.number().min(0),
        clientDiscountType: Joi.string().valid("TenSecRate4Client", "flatDiscount4Client", "flatRate4Client"),
        discountedValue4Client: Joi.number().optional(),
        clientBillingRate: Joi.number().min(0),
        gst4Client: Joi.number().min(0),
        remindStatus: Joi.boolean().optional(),
        isRoGenerated: Joi.boolean().optional(),
        roUrl: Joi.string().optional().allow(''),
        isClientRoGenerated: Joi.boolean().optional(),
        isVendorRoGenerated: Joi.boolean().optional(),
        clientRoUrl: Joi.string().optional().allow(''),
        vendorRoUrl: Joi.string().optional().allow(''),
        vendorId: Joi.string().optional().allow(''),
        nett4Client: Joi.number().min(0)

      });
    }
    else if (path == '/updateRadioFCT') {

      schema = Joi.object({
        _id: Joi.string(),
        companyName: Joi.string(),
        station: Joi.string(),
        agencyNameForBilling: Joi.string(),
        advertiserNameForBilling: Joi.string(),
        brandName: Joi.string(),
        campaignStartDate: Joi.date(),
        campaignEndDate: Joi.date(),
        campaignDays: Joi.number().integer().min(0),
        ratePer10Secs: Joi.number().min(0),
        timeBand: Joi.string(),
        adDuration: Joi.number().min(0),
        spotsPerDay: Joi.number().integer().min(0),
        totalSpots: Joi.number().integer().min(0),
        totalSeconds: Joi.number().integer().min(0),
        nettAmount: Joi.number().min(0),
        gst: Joi.number().min(0),
        totalPayableAfterTaxes: Joi.number().min(0),

        coSponsor: Joi.boolean().default(false),
        csProgramDate: Joi.string().optional().allow(''),
        csSelectedPrograms: Joi.array().items(Joi.string()).empty().optional(),
        namingRights: Joi.boolean().default(false),
        nrProgramDate: Joi.string().optional().allow(''),
        nrSelectedPrograms: Joi.array().items(Joi.string()).empty().optional(),
        dayBranding: Joi.boolean().default(false).optional(),
        dbProgramDate: Joi.string().optional(),
        assocDayBranding: Joi.boolean().default(false).optional(),
        adbProgramDate: Joi.string().optional(),


        tagLine: Joi.string(),
        paymentTermsWithChequeDetails: Joi.string(),
        attachmentFile: Joi.string(),
        note: Joi.string(),
        clientRate: Joi.number().min(0),
        clientDiscountType: Joi.string().valid("TenSecRate4Client", "flatDiscount4Client", "flatRate4Client"),
        discountedValue4Client: Joi.number().optional(),
        clientBillingRate: Joi.number().min(0),
        gst4Client: Joi.number().min(0),
        remindStatus: Joi.boolean().optional(),
        isRoGenerated: Joi.boolean().optional(),
        roUrl: Joi.string().optional().allow(''),
        isClientRoGenerated: Joi.boolean().optional(),
        isVendorRoGenerated: Joi.boolean().optional(),
        clientRoUrl: Joi.string().optional().allow(''),
        vendorRoUrl: Joi.string().optional().allow(''),
        vendorId: Joi.string().optional().allow(''),
        nett4Client: Joi.number().min(0)

      });
    }
    else if (path == '/addRadioNTR') {

      schema = Joi.object({
        roDate: Joi.string().required(),
        companyName: Joi.string().required(),
        station: Joi.string().required(),
        agencyNameForBilling: Joi.string().required(),
        advertiserNameForBilling: Joi.string().required(),
        brandName: Joi.string().required(),
        campaignStartDate: Joi.date().required(),
        campaignEndDate: Joi.date().required(),
        campaignDays: Joi.number().required(),
        ratePer10Secs: Joi.number().required(),
        timeBand: Joi.string(),
        adDuration: Joi.number(),
        ntr: Joi.string().optional(),
        totalSpots: Joi.number(),
        totalSeconds: Joi.number(),
        nettAmount: Joi.number(),
        gst: Joi.number(),
        totalPayableAfterTaxes: Joi.number(),

        coSponsor: Joi.boolean().default(false),
        csProgramDate: Joi.string().optional().allow(''),
        csSelectedPrograms: Joi.array().items(Joi.string()).empty().optional(),
        namingRights: Joi.boolean().default(false),
        nrProgramDate: Joi.string().optional().allow(''),
        nrSelectedPrograms: Joi.array().items(Joi.string()).empty().optional(),
        dayBranding: Joi.boolean().default(false).optional(),
        dbProgramDate: Joi.string().optional(),
        assocDayBranding: Joi.boolean().default(false).optional(),
        adbProgramDate: Joi.string().optional(),

        tagline: Joi.string(),
        note: Joi.string(),
        paymentTermsWithchequeDetails: Joi.string(),
        attachmentFile: Joi.string(),
        clientBillingRate: Joi.number(),
        remindStatus: Joi.boolean().optional(),
        isRoGenerated: Joi.boolean().optional(),
        roUrl: Joi.string().optional().allow(''),
        isClientRoGenerated: Joi.boolean().optional(),
        isVendorRoGenerated: Joi.boolean().optional(),
        clientRoUrl: Joi.string().optional().allow(''),
        vendorRoUrl: Joi.string().optional().allow(''),
        vendorId: Joi.string().optional().allow(''),
        gst4Client: Joi.number(),
        nett4Client: Joi.number()

      });
    }
    else if (path == '/updateRadioNTR') {

      schema = Joi.object({
        _id: Joi.string().required(),
        roDate: Joi.string().optional(),
        companyName: Joi.string().optional(),
        station: Joi.string().optional(),
        agencyNameForBilling: Joi.string().optional(),
        advertiserNameForBilling: Joi.string().optional(),
        brandName: Joi.string().optional(),
        campaignStartDate: Joi.date().optional(),
        campaignEndDate: Joi.date().optional(),
        campaignDays: Joi.number().optional(),
        ratePer10Secs: Joi.number().optional(),
        timeBand: Joi.string().optional(),
        adDuration: Joi.number().optional(),
        ntr: Joi.string().optional(),
        totalSpots: Joi.number().optional(),
        totalSeconds: Joi.number().optional(),
        nettAmount: Joi.number().optional(),
        gst: Joi.number().optional(),
        totalPayableAfterTaxes: Joi.number().optional(),


        coSponsor: Joi.boolean().default(false),
        csProgramDate: Joi.string().optional().allow(''),
        csSelectedPrograms: Joi.array().items(Joi.string()).empty().optional(),
        namingRights: Joi.boolean().default(false),
        nrProgramDate: Joi.string().optional().allow(''),
        nrSelectedPrograms: Joi.array().items(Joi.string()).empty().optional(),
        dayBranding: Joi.boolean().default(false).optional(),
        dbProgramDate: Joi.string().optional(),
        assocDayBranding: Joi.boolean().default(false).optional(),
        adbProgramDate: Joi.string().optional(),

        tagline: Joi.string().optional(),
        note: Joi.string().optional(),
        paymentTermsWithchequeDetails: Joi.string().optional(),
        attachmentFile: Joi.string().optional(),
        clientBillingRate: Joi.number().optional(),
        gst4Client: Joi.number().optional(),
        isRoGenerated: Joi.boolean().optional(),
        roUrl: Joi.string().optional().allow(''),
        isClientRoGenerated: Joi.boolean().optional(),
        isVendorRoGenerated: Joi.boolean().optional(),
        clientRoUrl: Joi.string().optional().allow(''),
        vendorRoUrl: Joi.string().optional().allow(''),
        vendorId: Joi.string().optional().allow(''),
        nett4Client: Joi.number().optional()

      });
    }
    else if (path == '/addRadioNFCT') {

      schema = Joi.object({
        roDate: Joi.string().required(),
        companyName: Joi.string().allow('').required(),
        station: Joi.string().allow('').required(),
        agencyNameForBilling: Joi.string().allow('').required(),
        advertiserNameForBilling: Joi.string().allow('').required(),
        brandName: Joi.string().allow('').required(),
        campaignStartDate: Joi.date().required(),
        campaignEndDate: Joi.date().required(),
        campaignDays: Joi.number().required(),
        ratePer10Secs: Joi.number().optional(),
        timeBand: Joi.string().allow('').optional(),
        adDuration: Joi.number().optional(),
        nfct: Joi.string().optional(),
        totalSpots: Joi.number().optional(),
        totalSeconds: Joi.number().optional(),
        nettAmount: Joi.number().optional(),
        gst: Joi.number().required(),
        totalPayableAfterTaxes: Joi.number().optional(),
        coSponsor: Joi.boolean().default(false),
        csProgramDate: Joi.string().optional().allow(''),
        csSelectedPrograms: Joi.array().items(Joi.string()).empty().optional(),
        namingRights: Joi.boolean().default(false),
        nrProgramDate: Joi.string().optional().allow(''),
        nrSelectedPrograms: Joi.array().items(Joi.string()).empty().optional(),
        dayBranding: Joi.boolean().default(false).optional(),
        dbProgramDate: Joi.string().optional(),
        assocDayBranding: Joi.boolean().default(false).optional(),
        adbProgramDate: Joi.string().optional(),
        tagLine: Joi.string().allow('').optional(),
        paymentTermsWithChequeDetails: Joi.string().allow('').optional(),
        note: Joi.string().allow('').optional(),
        attachmentFile: Joi.string().optional(),
        clientBillingRate: Joi.number().optional(),
        gst4Client: Joi.number().optional(),
        remindStatus: Joi.boolean().default(false),
        isRoGenerated: Joi.boolean().optional(),
        roUrl: Joi.string().optional().allow(''),
        isClientRoGenerated: Joi.boolean().optional(),
        isVendorRoGenerated: Joi.boolean().optional(),
        clientRoUrl: Joi.string().optional().allow(''),
        vendorRoUrl: Joi.string().optional().allow(''),
        vendorId: Joi.string().optional().allow(''),
        nett4Client: Joi.number().optional()

      });
    }
    else if (path == '/updateRadioNFCT') {

      schema = Joi.object({
        _id: Joi.string().required(),
        roDate: Joi.string().optional(),
        companyName: Joi.string().allow('').optional(),
        station: Joi.string().allow('').optional(),
        agencyNameForBilling: Joi.string().allow('').optional(),
        advertiserNameForBilling: Joi.string().allow('').optional(),
        brandName: Joi.string().allow('').optional(),
        campaignStartDate: Joi.date().optional(),
        campaignEndDate: Joi.date().optional(),
        campaignDays: Joi.number().optional(),
        ratePer10Secs: Joi.number().optional(),
        timeBand: Joi.string().allow('').optional(),
        adDuration: Joi.number().optional(),
        nfct: Joi.string().optional(),
        totalSpots: Joi.number().optional(),
        totalSeconds: Joi.number().optional(),
        nettAmount: Joi.number().optional(),
        gst: Joi.number().optional(),
        totalPayableAfterTaxes: Joi.number().optional(),
        coSponsor: Joi.boolean().default(false),
        csProgramDate: Joi.string().optional().allow(''),
        csSelectedPrograms: Joi.array().items(Joi.string()).empty().optional(),
        namingRights: Joi.boolean().default(false),
        nrProgramDate: Joi.string().optional().allow(''),
        nrSelectedPrograms: Joi.array().items(Joi.string()).empty().optional(),
        dayBranding: Joi.boolean().default(false).optional(),
        dbProgramDate: Joi.string().optional(),
        assocDayBranding: Joi.boolean().default(false).optional(),
        adbProgramDate: Joi.string().optional(),
        tagLine: Joi.string().allow('').optional(),
        paymentTermsWithChequeDetails: Joi.string().allow('').optional(),
        note: Joi.string().allow('').optional(),
        attachmentFile: Joi.string().optional(),
        clientBillingRate: Joi.number().optional(),
        gst4Client: Joi.number().optional(),
        remindStatus: Joi.boolean().default(false),
        isRoGenerated: Joi.boolean().optional(),
        roUrl: Joi.string().optional().allow(''),
        isClientRoGenerated: Joi.boolean().optional(),
        isVendorRoGenerated: Joi.boolean().optional(),
        clientRoUrl: Joi.string().optional().allow(''),
        vendorRoUrl: Joi.string().optional().allow(''),
        vendorId: Joi.string().optional().allow(''),
        nett4Client: Joi.number().optional()
      })
    }

    else if (path == '/addRadioRJ') {

      schema = Joi.object({
        roDate: Joi.date().default(new Date()),
        companyName: Joi.string().required(),
        station: Joi.string().required(),
        agencyNameForBilling: Joi.string().required(),
        advertiserNameForBilling: Joi.string().required(),
        brandName: Joi.string().required(),
        campaignStartDate: Joi.date().required(),
        campaignEndDate: Joi.date().required(),
        campaignDays: Joi.number().required(),
        ratePerSpotRJ: Joi.number().required(),
        timeBand: Joi.string(),
        adDuration: Joi.number(),
        spotsPerDay: Joi.number(),
        totalSpots: Joi.number(),
        totalSeconds: Joi.number(),
        nettAmount: Joi.number(),
        gst: Joi.number(),
        totalPayableAfterTaxes: Joi.number(),
        tagline: Joi.string(),
        attachmentFile: Joi.string(),
        note: Joi.string(),
        paymentTermsWithChequeDetails: Joi.string(),
        coSponsor: Joi.boolean().default(false),
        csProgramDate: Joi.string().optional().allow(''),
        csSelectedPrograms: Joi.array().items(Joi.string()).empty().optional(),
        namingRights: Joi.boolean().default(false),
        nrProgramDate: Joi.string().optional().allow(''),
        nrSelectedPrograms: Joi.array().items(Joi.string()).empty().optional(),
        dayBranding: Joi.boolean().default(false).optional(),
        dbProgramDate: Joi.string().optional(),
        assocDayBranding: Joi.boolean().default(false).optional(),
        adbProgramDate: Joi.string().optional(),
        clientRate: Joi.number(),
        clientDiscountType: Joi.string().valid('ratePerSpot4Client', 'flatDiscount4Client', 'flatRate4Client'),
        discountedValue4Client: Joi.number(),
        clientBillingRate: Joi.number(),
        gst4Client: Joi.number(),
        remindStatus: Joi.boolean().default(false),
        isRoGenerated: Joi.boolean().optional(),
        roUrl: Joi.string().optional().allow(''),
        isClientRoGenerated: Joi.boolean().optional(),
        isVendorRoGenerated: Joi.boolean().optional(),
        clientRoUrl: Joi.string().optional().allow(''),
        vendorRoUrl: Joi.string().optional().allow(''),
        vendorId: Joi.string().optional().allow(''),
        nett4Client: Joi.number()

      });
    }
    else if (path == '/updateRadioRJ') {

      schema = Joi.object({
        _id: Joi.string().required(),
        roDate: Joi.string().optional(),
        companyName: Joi.string().optional(),
        station: Joi.string().optional(),
        agencyNameForBilling: Joi.string().optional(),
        advertiserNameForBilling: Joi.string().optional(),
        brandName: Joi.string().optional(),
        campaignStartDate: Joi.string().optional(),
        campaignEndDate: Joi.string().optional(),
        campaignDays: Joi.number().optional(),
        ratePerSpotRJ: Joi.number().optional(),
        timeBand: Joi.string().optional(),
        adDuration: Joi.number().optional(),
        spotsPerDay: Joi.number().optional(),
        totalSpots: Joi.number().optional(),
        totalSeconds: Joi.number().optional(),
        nettAmount: Joi.number().optional(),
        gst: Joi.number().optional(),
        totalPayableAfterTaxes: Joi.number().optional(),
        tagline: Joi.string().optional(),
        attachmentFile: Joi.string().optional(),
        note: Joi.string().optional(),
        paymentTermsWithChequeDetails: Joi.string().optional(),
        coSponsor: Joi.boolean().default(false),
        csProgramDate: Joi.string().optional().allow(''),
        csSelectedPrograms: Joi.array().items(Joi.string()).empty().optional(),
        namingRights: Joi.boolean().default(false),
        nrProgramDate: Joi.string().optional().allow(''),
        nrSelectedPrograms: Joi.array().items(Joi.string()).empty().optional(),
        dayBranding: Joi.boolean().default(false).optional(),
        dbProgramDate: Joi.string().optional(),
        assocDayBranding: Joi.boolean().default(false).optional(),
        adbProgramDate: Joi.string().optional(),
        clientRate: Joi.number().optional(),
        clientDiscountType: Joi.string().valid('ratePerSpot4Client', 'flatDiscount4Client', 'flatRate4Client').optional(),
        discountedValue4Client: Joi.number().optional(),
        clientBillingRate: Joi.number().optional(),
        gst4Client: Joi.number().optional(),
        remindStatus: Joi.boolean().default(false),
        isRoGenerated: Joi.boolean().optional(),
        roUrl: Joi.string().optional().allow(''),
        isClientRoGenerated: Joi.boolean().optional(),
        isVendorRoGenerated: Joi.boolean().optional(),
        clientRoUrl: Joi.string().optional().allow(''),
        vendorRoUrl: Joi.string().optional().allow(''),
        vendorId: Joi.string().optional().allow(''),
        nett4Client: Joi.number().optional()
      })
    }
    else if (path == '/addOohHoarding') {

      schema = Joi.object({
        roDate: Joi.date().default(new Date()),
        clientName: Joi.string().required(),
        brand: Joi.string().required(),
        campaignPeriod: Joi.string().required(),
        numberOfMonths: Joi.number().required(),
        advertisementType: Joi.string(),
        location: Joi.string(),
        position: Joi.string(),
        sizeInFeet: Joi.number(),
        materialType: Joi.string(),
        numberOfUnits: Joi.number(),
        costPerUnit: Joi.number(),
        totalAmount: Joi.number(),
        nettAmount: Joi.number(),
        discountType: Joi.string().valid('discountPercentage', 'flatDiscountAmount', 'flatMediaRate'),
        gst: Joi.number(),
        totalPayable: Joi.number(),
        printAndMountingCost: Joi.number(),
        discountedAmount: Joi.number(),
        attachmentFile: Joi.string(),
        note: Joi.string(),
        clientDiscountType: Joi.string().valid('percentageFromTotalAmount', 'flatDiscount', 'flatRate'),
        clientRate: Joi.number(),
        discountedValue4Client: Joi.number(),
        clientBillingRate: Joi.number(),
        gst4Client: Joi.number(),
        remindStatus: Joi.boolean().default(false),
        isRoGenerated: Joi.boolean().optional(),
        roUrl: Joi.string().optional().allow(''),
        isClientRoGenerated: Joi.boolean().optional(),
        isVendorRoGenerated: Joi.boolean().optional(),
        clientRoUrl: Joi.string().optional().allow(''),
        vendorRoUrl: Joi.string().optional().allow(''),
        vendorId: Joi.string().optional().allow(''),
        billValue4Client: Joi.number()

      });
    }
    else if (path == '/updateOohHoarding') {

      schema = Joi.object({
        _id: Joi.string().required(),
        roDate: Joi.string().optional(),
        clientName: Joi.string().optional(),
        brand: Joi.string().optional(),
        campaignPeriod: Joi.string().optional(),
        numberOfMonths: Joi.number().optional(),
        advertisementType: Joi.string().optional(),
        location: Joi.string().optional(),
        position: Joi.string().optional(),
        sizeInFeet: Joi.number().optional(),
        materialType: Joi.string().optional(),
        numberOfUnits: Joi.number().optional(),
        costPerUnit: Joi.number().optional(),
        totalAmount: Joi.number().optional(),
        nettAmount: Joi.number().optional(),
        discountType: Joi.string().valid('discountPercentage', 'flatDiscountAmount', 'flatMediaRate').optional(),
        gst: Joi.number().optional(),
        printAndMountingCost: Joi.number().optional(),
        discountedAmount: Joi.number().optional(),
        totalPayable: Joi.number().optional(),
        attachmentFile: Joi.string().optional(),
        note: Joi.string().optional(),
        clientDiscountType: Joi.string().valid('percentageFromTotalAmount', 'flatDiscount', 'flatRate').optional(),
        clientRate: Joi.number().optional(),
        discountedValue4Client: Joi.number().optional(),
        clientBillingRate: Joi.number().optional(),
        gst4Client: Joi.number().optional(),
        remindStatus: Joi.boolean().default(false).optional(),
        isRoGenerated: Joi.boolean().optional(),
        roUrl: Joi.string().optional().allow(''),
        isClientRoGenerated: Joi.boolean().optional(),
        isVendorRoGenerated: Joi.boolean().optional(),
        clientRoUrl: Joi.string().optional().allow(''),
        vendorRoUrl: Joi.string().optional().allow(''),
        vendorId: Joi.string().optional().allow(''),
        billValue4Client: Joi.number().optional()
      })
    }
    else if (path == '/addOohBusAd') {

      schema = Joi.object({
        roDate: Joi.date().default(new Date()),
        clientName: Joi.string().required(),
        brand: Joi.string().required(),
        campaignPeriod: Joi.string().required(),
        numberOfMonths: Joi.number().required(),
        advertisementType: Joi.string(),
        place: Joi.string(),
        position: Joi.string(),
        numberOfBuses: Joi.number(),
        costPerMonthPerBus: Joi.number(),
        totalAmount: Joi.number(),
        discountType: Joi.string().valid('discountPercentage', 'flatDiscountAmount', 'flatMediaRate'),
        nettAmount: Joi.number(),
        gst: Joi.number(),
        totalPayable: Joi.number(),
        printAndMountingCost: Joi.number(),
        discountedAmount: Joi.number(),
        note: Joi.string(),
        attachedFile: Joi.string(),
        clientDiscountType: Joi.string().valid('percentageFromTotalAmount', 'flatDiscount', 'flatRate'),
        clientRate: Joi.number(),
        discountedValue4Client: Joi.number(),
        clientBillingRate: Joi.number(),
        gst4Client: Joi.number(),
        isRoGenerated: Joi.boolean().optional(),
        roUrl: Joi.string().optional().allow(''),
        isClientRoGenerated: Joi.boolean().optional(),
        isVendorRoGenerated: Joi.boolean().optional(),
        clientRoUrl: Joi.string().optional().allow(''),
        vendorRoUrl: Joi.string().optional().allow(''),
        vendorId: Joi.string().optional().allow(''),
        remindStatus: Joi.boolean().default(false),
        billValue4Client: Joi.number()

      });
    }
    else if (path == '/updateOohBusAd') {

      schema = Joi.object({
        _id: Joi.string().required(),
        roDate: Joi.date().default(new Date()),
        clientName: Joi.string().optional(),
        brand: Joi.string().optional(),
        campaignPeriod: Joi.string().optional(),
        numberOfMonths: Joi.number().optional(),
        advertisementType: Joi.string().optional(),
        place: Joi.string().optional(),
        position: Joi.string().optional(),
        numberOfBuses: Joi.number().optional(),
        costPerMonthPerBus: Joi.number().optional(),
        totalAmount: Joi.number().optional(),
        discountType: Joi.string().valid('discountPercentage', 'flatDiscountAmount', 'flatMediaRate').optional(),
        nettAmount: Joi.number().optional(),
        gst: Joi.number().optional(),
        totalPayable: Joi.number().optional(),
        printAndMountingCost: Joi.number().optional(),
        discountedAmount: Joi.number().optional(),
        note: Joi.string().optional(),
        attachedFile: Joi.string().optional(),
        clientDiscountType: Joi.string().valid('percentageFromTotalAmount', 'flatDiscount', 'flatRate').optional(),
        clientRate: Joi.number().optional(),
        discountedValue4Client: Joi.number().optional(),
        clientBillingRate: Joi.number().optional(),
        isRoGenerated: Joi.boolean().optional(),
        roUrl: Joi.string().optional().allow(''),
        isClientRoGenerated: Joi.boolean().optional(),
        isVendorRoGenerated: Joi.boolean().optional(),
        clientRoUrl: Joi.string().optional().allow(''),
        vendorRoUrl: Joi.string().optional().allow(''),
        vendorId: Joi.string().optional().allow(''),
        gst4Client: Joi.number().optional(),
        remindStatus: Joi.boolean().default(false).optional(),
        billValue4Client: Joi.number().optional()
      })
    }




    else if (path == '/addNewsPaper') {

      schema = Joi.object({
        category: Joi.string().required(),
        name: Joi.string().required(),
        type: Joi.string().required(),
        providerTiming: Joi.string().required(),
        addressLine1: Joi.string().required(),
        addressLine2: Joi.string().required(),
        addressLine3: Joi.string().required(),
        pincode: Joi.string().required(),
        state: Joi.string().required(),
        district: Joi.string().required(),
        contactNumbers: Joi.array().items(Joi.object({
          contactPerson: Joi.string(),
          designation: Joi.string(),
          primaryContact: Joi.boolean(),
          contactType: Joi.string(),
          contactNumber: Joi.string(),
          extension: Joi.string(),
          timingFrom: Joi.string(),
          timingTo: Joi.string()
        })),
        contactEmails: Joi.array().items(Joi.object({
          email: Joi.string().email(),
          contactPerson: Joi.string(),
          designation: Joi.string(),
          primaryContact: Joi.boolean()
        }))
      });
    }
    else if (path == '/updateNewsPaper') {

      schema = Joi.object({
        _id: Joi.string().required(),
        category: Joi.string().optional(),
        name: Joi.string().optional(),
        type: Joi.string().optional(),
        providerTiming: Joi.string().optional(),
        addressLine1: Joi.string().optional(),
        addressLine2: Joi.string().optional(),
        addressLine3: Joi.string().optional(),
        pincode: Joi.string().optional(),
        state: Joi.string().optional(),
        district: Joi.string().optional(),
        contactNumbers: Joi.array().items(Joi.object({
          contactPerson: Joi.string(),
          designation: Joi.string(),
          primaryContact: Joi.boolean(),
          contactType: Joi.string(),
          contactNumber: Joi.string(),
          extension: Joi.string(),
          timingFrom: Joi.string(),
          timingTo: Joi.string() // This line should not have closing parenthesis here
        })).optional(),
        contactEmails: Joi.array().items(Joi.object({
          email: Joi.string().email(),
          contactPerson: Joi.string(),
          designation: Joi.string(),
          primaryContact: Joi.boolean()
        })).optional()

      })
    }


    else if (path == '/addTV' || path == '/addRadioVendor') {

      schema = Joi.object({
        category: Joi.string().required(),
        name: Joi.string().required(),
        type: Joi.string().required(),
        companyName: Joi.string().required(),
        agencyName: Joi.string().required(),
        advertiserName: Joi.string().required(),
        brandName: Joi.string().required(),
        providerTiming: Joi.string().required(),
        addressLine1: Joi.string().required(),
        addressLine2: Joi.string().required(),
        addressLine3: Joi.string().required(),
        pincode: Joi.string().required(),
        state: Joi.string().required(),
        district: Joi.string().required(),
        contactNumbers: Joi.array().items(Joi.object({
          contactPerson: Joi.string(),
          designation: Joi.string(),
          primaryContact: Joi.boolean(),
          contactType: Joi.string(),
          contactNumber: Joi.string(),
          extension: Joi.string(),
          timingFrom: Joi.string(),
          timingTo: Joi.string()
        })),
        contactEmails: Joi.array().items(Joi.object({
          email: Joi.string().email(),
          contactPerson: Joi.string(),
          designation: Joi.string(),
          primaryContact: Joi.boolean()
        }))
      });
    }
    else if (path == '/updateTV' || path == '/updateRadioVendor') {

      schema = Joi.object({
        _id: Joi.string().required(),
        category: Joi.string().optional(),
        name: Joi.string().optional(),
        type: Joi.string().optional(),
        companyName: Joi.string().optional(),
        agencyName: Joi.string().optional(),
        advertiserName: Joi.string().optional(),
        brandName: Joi.string().optional(),
        providerTiming: Joi.string().optional(),
        addressLine1: Joi.string().optional(),
        addressLine2: Joi.string().optional(),
        addressLine3: Joi.string().optional(),
        pincode: Joi.string().optional(),
        state: Joi.string().optional(),
        district: Joi.string().optional(),
        contactNumbers: Joi.array().items(Joi.object({
          contactPerson: Joi.string(),
          designation: Joi.string(),
          primaryContact: Joi.boolean(),
          contactType: Joi.string(),
          contactNumber: Joi.string(),
          extension: Joi.string(),
          timingFrom: Joi.string(),
          timingTo: Joi.string() // This line should not have closing parenthesis here
        })).optional(),
        contactEmails: Joi.array().items(Joi.object({
          email: Joi.string().email(),
          contactPerson: Joi.string(),
          designation: Joi.string(),
          primaryContact: Joi.boolean()
        })).optional()

      })
    }

    else if (path == '/addOOHVendor') {

      schema = Joi.object({
        category: Joi.string().required(),
        name: Joi.string().required(),
        type: Joi.string().required(),
        brandName: Joi.string().required(),
        providerTiming: Joi.string().required(),
        addressLine1: Joi.string().required(),
        addressLine2: Joi.string().required(),
        addressLine3: Joi.string().required(),
        pincode: Joi.string().required(),
        state: Joi.string().required(),
        district: Joi.string().required(),
        contactNumbers: Joi.array().items(Joi.object({
          contactPerson: Joi.string(),
          designation: Joi.string(),
          primaryContact: Joi.boolean(),
          contactType: Joi.string(),
          contactNumber: Joi.string(),
          extension: Joi.string(),
          timingFrom: Joi.string(),
          timingTo: Joi.string()
        })),
        contactEmails: Joi.array().items(Joi.object({
          email: Joi.string().email(),
          contactPerson: Joi.string(),
          designation: Joi.string(),
          primaryContact: Joi.boolean()
        }))
      });
    }
    else if (path == '/updateOOHVendor') {

      schema = Joi.object({
        _id: Joi.string().required(),
        category: Joi.string().optional(),
        name: Joi.string().optional(),
        type: Joi.string().optional(),
        brandName: Joi.string().optional(),
        providerTiming: Joi.string().optional(),
        addressLine1: Joi.string().optional(),
        addressLine2: Joi.string().optional(),
        addressLine3: Joi.string().optional(),
        pincode: Joi.string().optional(),
        state: Joi.string().optional(),
        district: Joi.string().optional(),
        contactNumbers: Joi.array().items(Joi.object({
          contactPerson: Joi.string(),
          designation: Joi.string(),
          primaryContact: Joi.boolean(),
          contactType: Joi.string(),
          contactNumber: Joi.string(),
          extension: Joi.string(),
          timingFrom: Joi.string(),
          timingTo: Joi.string() // This line should not have closing parenthesis here
        })).optional(),
        contactEmails: Joi.array().items(Joi.object({
          email: Joi.string().email(),
          contactPerson: Joi.string(),
          designation: Joi.string(),
          primaryContact: Joi.boolean()
        })).optional()

      })
    }

    else if (path == '/addYouTubeVendor') {

      schema = Joi.object({

        name: Joi.string().required(),
        type: Joi.string().required(),
        brandName: Joi.string().required(),
        channelName: Joi.string().required(),
        addressLine1: Joi.string().required(),
        addressLine2: Joi.string().required(),
        addressLine3: Joi.string().required(),
        pincode: Joi.string().required(),
        state: Joi.string().required(),
        district: Joi.string().required(),
        contactNumbers: Joi.array().items(Joi.object({
          contactPerson: Joi.string(),
          designation: Joi.string(),
          primaryContact: Joi.boolean(),
          contactType: Joi.string(),
          contactNumber: Joi.string(),
          extension: Joi.string(),
          timingFrom: Joi.string(),
          timingTo: Joi.string()
        })),
        contactEmails: Joi.array().items(Joi.object({
          email: Joi.string().email(),
          contactPerson: Joi.string(),
          designation: Joi.string(),
          primaryContact: Joi.boolean()
        }))
      });
    }
    else if (path == '/updateYouTubeVendor') {

      schema = Joi.object({
        _id: Joi.string().required(),
        name: Joi.string().optional(),
        type: Joi.string().optional(),
        brandName: Joi.string().optional(),
        channelName: Joi.string().optional(),
        addressLine1: Joi.string().optional(),
        addressLine2: Joi.string().optional(),
        addressLine3: Joi.string().optional(),
        pincode: Joi.string().optional(),
        state: Joi.string().optional(),
        district: Joi.string().optional(),
        contactNumbers: Joi.array().items(Joi.object({
          contactPerson: Joi.string(),
          designation: Joi.string(),
          primaryContact: Joi.boolean(),
          contactType: Joi.string(),
          contactNumber: Joi.string(),
          extension: Joi.string(),
          timingFrom: Joi.string(),
          timingTo: Joi.string() // This line should not have closing parenthesis here
        })).optional(),
        contactEmails: Joi.array().items(Joi.object({
          email: Joi.string().email(),
          contactPerson: Joi.string(),
          designation: Joi.string(),
          primaryContact: Joi.boolean()
        })).optional()

      })
    }

    else if (path == '/addTheatreVendor' || path == '/addOtherVendor') {

      schema = Joi.object({

        name: Joi.string().required(),
        type: Joi.string().required(),
        brandName: Joi.string().required(),
        addressLine1: Joi.string().required(),
        addressLine2: Joi.string().required(),
        addressLine3: Joi.string().required(),
        pincode: Joi.string().required(),
        state: Joi.string().required(),
        district: Joi.string().required(),
        contactNumbers: Joi.array().items(Joi.object({
          contactPerson: Joi.string(),
          designation: Joi.string(),
          primaryContact: Joi.boolean(),
          contactType: Joi.string(),
          contactNumber: Joi.string(),
          extension: Joi.string(),
          timingFrom: Joi.string(),
          timingTo: Joi.string()
        })),
        contactEmails: Joi.array().items(Joi.object({
          email: Joi.string().email(),
          contactPerson: Joi.string(),
          designation: Joi.string(),
          primaryContact: Joi.boolean()
        }))
      });
    }
    else if (path == '/updateTheatreVendor' || path == '/updateOtherVendor') {

      schema = Joi.object({
        _id: Joi.string().required(),
        name: Joi.string().optional(),
        type: Joi.string().optional(),
        brandName: Joi.string().optional(),
        addressLine1: Joi.string().optional(),
        addressLine2: Joi.string().optional(),
        addressLine3: Joi.string().optional(),
        pincode: Joi.string().optional(),
        state: Joi.string().optional(),
        district: Joi.string().optional(),
        contactNumbers: Joi.array().items(Joi.object({
          contactPerson: Joi.string(),
          designation: Joi.string(),
          primaryContact: Joi.boolean(),
          contactType: Joi.string(),
          contactNumber: Joi.string(),
          extension: Joi.string(),
          timingFrom: Joi.string(),
          timingTo: Joi.string()
        })).optional(),
        contactEmails: Joi.array().items(Joi.object({
          email: Joi.string().email(),
          contactPerson: Joi.string(),
          designation: Joi.string(),
          primaryContact: Joi.boolean()
        })).optional()

      })
    }
    else {

      throw new Error('not found');
    }

    const { error } = schema.validate(data, { abortEarly: false });

    if (!error) {
      next();
    } else {
      let currentIndex = 0;

      function displayError() {
        if (currentIndex < error.details.length) {
          let currentError = error.details[currentIndex];

          // Customize the error message based on your needs
          let errorMessage = currentError.message;
          res.json({ status: false, message: errorMessage });

          currentIndex++;
        } else {
          // If all errors are displayed, you can proceed to the next step
          next();
        }
      }

      // Initial display of the first error
      displayError();
    }
  } catch (e) {
    console.log('Error caught:', e.message);
    if (e.message === 'not found') {
      res.json({ status: false, message: 'Invalid URL !!!' });
    } else {
      res.json({ status: false, message: 'Oops! Something went wrong. Please try again later' });
    }
  }
};
